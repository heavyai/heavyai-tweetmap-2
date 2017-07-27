import {combineReducers} from "redux"
import legend from "../Legend/reducer"
import mapBody from "../MapBody/reducer"
import nav from "../Nav/reducer"
import shareModal from "../ShareModal/reducer"
import topOverlay from "../TopOverlay/reducer"
import tweetSidebar from "../TweetSidebar/reducer"

const appReducer = combineReducers({
  legend,
  mapBody,
  nav,
  shareModal,
  topOverlay,
  tweetSidebar
})

export default appReducer
