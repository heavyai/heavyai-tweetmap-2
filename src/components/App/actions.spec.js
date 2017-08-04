import * as actions from "./actions"
import chai, {expect} from "chai"
import spies from "chai-spies"
chai.use(spies)

describe("App Actions", () => {
  describe("MapD Connect", () => {
    it("should call connect and createCf", () => {
      const func = () => Promise.resolve()
      const connect = chai.spy(func)
      const createCf = chai.spy(func)
      const api = {connect, createCf}

      return actions.mapdConnect()(null, null, api).then(() => {
        expect(connect).to.have.been.called()
        expect(createCf).to.have.been.called()
      })
    })
  })
})
