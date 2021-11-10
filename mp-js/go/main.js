import './pkg/prelude.js'
import './pkg/pkg0001.js'

export default function Main() {
for (var f in $load) {
  $load[f]()
}
$mainPkg = $packages["main"],
  $synthesizeMethods(),
  $packages.runtime.$init(),
  $go($mainPkg.$init, []),
  $flushConsole()
}
