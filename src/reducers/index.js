import {combineReducers} from 'redux'
import filters from './filters'
import tweetBar from './tweetBar'
import shareMenu from './shareMenu'

const app = combineReducers({
  filters,
  tweetBar,
  shareMenu
})

export default app
