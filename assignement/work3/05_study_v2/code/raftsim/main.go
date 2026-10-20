// raftsim: a teaching model of Raft-style aggregator failover in Federated Learning.
// It is not Raft itself (no network, no log indexes); it keeps the three rules the
// paper relies on: randomised election timeout, majority vote, and replicated checkpoints.
package main

import (
	"fmt"
	"math/rand"
	"sort"
)

// Quorum is the number of votes needed in an N-node Raft cluster.
func Quorum(n int) int { return n/2 + 1 }

// MaxFailures is how many nodes may fail at the same time while the cluster still works.
func MaxFailures(n int) int { return (n - 1) / 2 }

// Checkpoint is the replicated FL state (Level 3 in Table 1 of the paper).
type Checkpoint struct {
	Round  int
	Params []float64
}

type Node struct {
	ID      int
	Alive   bool
	Timeout int // randomised election timeout in ms
	State   Checkpoint
}

type Cluster struct {
	Nodes  []*Node
	Leader *Node
	Term   int
	rng    *rand.Rand
}

func NewCluster(n int, seed int64) *Cluster {
	c := &Cluster{rng: rand.New(rand.NewSource(seed))}
	for i := 0; i < n; i++ {
		c.Nodes = append(c.Nodes, &Node{ID: i + 1, Alive: true})
	}
	return c
}

func (c *Cluster) alive() []*Node {
	var out []*Node
	for _, n := range c.Nodes {
		if n.Alive {
			out = append(out, n)
		}
	}
	return out
}

// Elect draws a fresh 150-300 ms timeout for every live node; the first to time out
// becomes candidate and wins only if the live nodes form a majority of the whole cluster.
func (c *Cluster) Elect() error {
	live := c.alive()
	for _, n := range live {
		n.Timeout = 150 + c.rng.Intn(151)
	}
	sort.Slice(live, func(i, j int) bool { return live[i].Timeout < live[j].Timeout })
	c.Term++
	if len(live) < Quorum(len(c.Nodes)) {
		c.Leader = nil
		return fmt.Errorf("term %d: only %d of %d nodes alive, need %d votes", c.Term, len(live), len(c.Nodes), Quorum(len(c.Nodes)))
	}
	c.Leader = live[0]
	return nil
}

// Checkpoint writes the aggregated state on the leader and copies it to every live follower.
func (c *Cluster) Checkpoint(cp Checkpoint) {
	for _, n := range c.alive() {
		n.State = Checkpoint{Round: cp.Round, Params: append([]float64(nil), cp.Params...)}
	}
}

func main() {
	fmt.Println("N  quorum  max failures")
	for _, n := range []int{2, 3, 5, 11} {
		fmt.Printf("%-2d %-7d %d\n", n, Quorum(n), MaxFailures(n))
	}

	c := NewCluster(11, 7)
	_ = c.Elect()
	fmt.Printf("\nterm %d: node %d is aggregator\n", c.Term, c.Leader.ID)
	params := []float64{0, 0}
	for round := 1; round <= 3; round++ {
		params[0] += 0.1 // stands in for FedAvg of the workers' updates
		c.Checkpoint(Checkpoint{Round: round, Params: params})
	}
	fmt.Printf("checkpoint after round %d replicated to %d nodes\n", c.Leader.State.Round, len(c.alive()))

	c.Leader.Alive = false // the aggregator crashes
	if err := c.Elect(); err == nil {
		fmt.Printf("term %d: node %d takes over and resumes from round %d\n", c.Term, c.Leader.ID, c.Leader.State.Round+1)
	}

	for _, n := range c.alive()[:5] { // five more crashes: 5 of 11 left, below quorum
		n.Alive = false
	}
	if err := c.Elect(); err != nil {
		fmt.Println(err)
	}

	// Traffic ratio from Fig. 4 of the paper (MB per FL round).
	base := []float64{0.98, 2.15, 3.1, 4.06, 5.02, 5.97, 6.93, 7.88, 8.84, 9.8}
	raft := []float64{1.77, 5.17, 7.94, 10.9, 16, 22.6, 29.3, 36.8, 43.9, 49.1}
	fmt.Println("\nworkers  ratio")
	for i := range base {
		fmt.Printf("%-8d %.2f\n", i+1, raft[i]/base[i])
	}
}
