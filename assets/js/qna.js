/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * Q&A Defense Simulator Engine
 */

class QnADefenseSimulator {
  constructor() {
    this.initDOM();
  }

  initDOM() {
    this.filterBtns = document.querySelectorAll('.btn-filter');
    this.qnaCards = document.querySelectorAll('.qna-card');
    this.randomBtn = document.getElementById('qna-random-btn');

    // Accordion toggle on question click
    this.qnaCards.forEach(card => {
      const btn = card.querySelector('.qna-question-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          card.classList.toggle('open');
        });
      }
    });

    // Category Filter
    if (this.filterBtns.length) {
      this.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const category = btn.getAttribute('data-category');
          this.filterCategory(category);

          this.filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    }

    // Random Question Generator
    if (this.randomBtn) {
      this.randomBtn.addEventListener('click', () => {
        this.pickRandomQuestion();
      });
    }
  }

  filterCategory(category) {
    this.qnaCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  pickRandomQuestion() {
    // Filter currently visible cards
    const visibleCards = Array.from(this.qnaCards).filter(c => c.style.display !== 'none');
    if (!visibleCards.length) return;

    // Close all cards first
    this.qnaCards.forEach(c => {
      c.classList.remove('open');
      c.style.boxShadow = '';
    });

    const randomIndex = Math.floor(Math.random() * visibleCards.length);
    const selectedCard = visibleCards[randomIndex];

    selectedCard.classList.add('open');
    selectedCard.style.boxShadow = '0 0 0 3px var(--accent)';

    selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.qna-defense-workbench')) {
    window.qnaDefense = new QnADefenseSimulator();
  }
});
