import store from 'store'
const storage = {
	name: 'Storage',
	get: key => {
    store.get(key)
  },
	set: (key, value) => {
    store.set(key, value)
  },
	remove: key => {
    store.remove(key)
  },
	clearAll: () => {
    store.clearAll()
  },
}
export default store.createStore(storage)