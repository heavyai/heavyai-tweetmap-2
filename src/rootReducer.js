import {combineReducers} from "redux"
import legend from "./components/Legend/reducer"
import mapBody from "./components/MapBody/reducer"
import nav from "./components/Nav/reducer"
import shareModal from "./components/ShareModal/reducer"
import topOverlay from "./components/TopOverlay/reducer"
import tweetSidebar from "./components/TweetSidebar/reducer"

const appReducer = combineReducers({
  legend,
  mapBody,
  nav,
  shareModal,
  topOverlay,
  tweetSidebar
})

export default appReducer
