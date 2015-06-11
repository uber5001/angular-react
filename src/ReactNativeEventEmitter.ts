/**
 * @providesModule ReactNativeEventEmitter
 */
module.exports = {
	receiveEvent: function(
		tag: number,
		topLevelType: string,
		nativeEventParam: Object
	) {
		console.log(tag, topLevelType, nativeEventParam)
	},
	receiveTouches: function(
		eventTopLevelType: string,
		touches: Array<Object>,
		changedIndices: Array<number>
	) {
		console.log(eventTopLevelType, touches, changedIndices)
	}
}