import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBars, faTimes, faHome, faChartBar, faSignOutAlt,
  faLock, faUser, faChartSimple, faShop, faChartLine, faTruckPlane, faWarehouse, faGears
 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faTimes, faHome, faChartBar, faSignOutAlt, faLock, faUser, faChartSimple, faShop, faChartLine, faTruckPlane, faWarehouse, faGears)

export default (app) => {
  app.component('font-awesome-icon', FontAwesomeIcon)
}