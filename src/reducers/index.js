import {combineReducers} from "redux"
import filters from "./filters"
import navigation from "./navigation"
import shareMenu from "./shareMenu"
import tweetBar from "./tweetBar"

const app = combineReducers({
  navigation,
  filters,
  tweetBar,
  shareMenu
})

export default app
