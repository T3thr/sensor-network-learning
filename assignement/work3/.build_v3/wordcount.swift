import Foundation
// Reads lines "<id>\t<text>" from stdin, prints "<id>\t<count>" (ICU word segmentation).
while let line = readLine() {
  let parts = line.components(separatedBy: "\t"); if parts.count < 2 { continue }
  let s = parts[1]; var n = 0
  s.enumerateSubstrings(in: s.startIndex..<s.endIndex, options: .byWords) { _,_,_,_ in n += 1 }
  print("\(parts[0])\t\(n)")
}
