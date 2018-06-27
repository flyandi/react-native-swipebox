/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, PanResponder, Animated } from 'react-native';
import _ from 'lodash';
import Styles from './styles';

/**
 * @component
 */
export default class SwipeBox extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        backgroundColor: PropTypes.string,
        borderColor: PropTypes.string,
        borderWidth: PropTypes.number,
        borderRadius: PropTypes.number,
        textColor: PropTypes.string,
        fontSize: PropTypes.number,
        style: PropTypes.any,
        onChange: PropTypes.func,
        onSwipeUp: PropTypes.func,
        onSwipeDown: PropTypes.func,
        width: PropTypes.number,
        height: PropTypes.number,
        size: PropTypes.number,
        tiles: PropTypes.array,
        velocityThreshold: PropTypes.number,
        directionalOffsetThreshold: PropTypes.number
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        backgroundColor: '#828186',
        borderColor: undefined,
        borderWidth: undefined,
        borderRadius: 3,
        textColor: '#FFFFFF',
        fontSize: undefined,
        style: {},
        width: undefined,
        height: undefined,
        size: 120,
        tiles: [],
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
        onChange: undefined,
        onSwipeUp: undefined,
        onSwipeDown: undefined,
    }

    /**
     * @constructor
     * @param props
     */
    constructor(props, context)
    {
        super(props, context);

        this.width = this.props.width || this.props.size;
        this.height = this.props.height || this.props.size;
        this.panelSize = this.height > this.width ? this.height : this.width;

        this.state = {
            bounceValue: new Animated.Value(0),
        };

        this.currentPosition = 0;
        this.currentTileIndex = 0;
    }

    /**
     * @componentWillMount
     */
    componentWillMount()
    {
        const swipeStart = this.handleSwipeStart.bind(this);
        const swipeEnd = this.handleSwipeEnd.bind(this);
        this.responders = PanResponder.create({
            onStartShouldSetPanResponder: swipeStart,
            onMoveShouldSetPanResponder: swipeStart,
            onPanResponderRelease: swipeEnd,
            onPanResponderTerminate: swipeEnd
        });
    }

    /**
     * handleSwipeStart for Pan Responder
     * @param evt
     * @param gestureState
     * @returns {boolean}
     */
    handleSwipeStart(event, gestureState)
    {
        return event.nativeEvent.touches.length === 1 && !this.isGestureClick(gestureState);
    }

    /**
     * handleSwipeEnd for Pan Responder
     * @param evt
     * @param gestureState
     * @returns {boolean}
     */
    handleSwipeEnd(evt, gestureState)
    {
        const {dy} = gestureState;

        if(this.isValidDirectionSwipe(gestureState)) {

            let toValue = this.currentPosition;
            let toIndex = this.currentIndex;

            if( dy > 0) {
                toValue -= this.panelSize;
                toIndex += 1;

                this.props.onSwipeUp && this.props.onSwipeUp();

            } else {
                toValue += this.panelSize;
                toIndex -= 1;

                this.props.onSwipeDown && this.props.onSwipeDown();
            }

            if(toValue > 0) {
                toValue = 0;
                toIndex = 0;
            }

            const max = -1 * (this.props.tiles.length - 1) * this.panelSize;
            if(toValue <= max) {
                toValue = max;
                toIndex = this.props.tiles.length - 1;
            }

            this.currentPosition = toValue;
            this.currentIndex = toIndex;

            Animated.spring(
                this.state.bounceValue,
                {
                    toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start(() => {
                this.props.onChange && this.props.onChange(this.currentIndex, this.props.tiles[this.currentIndex]);
            });
        }
    }

    /**
     * @param gestureState
     * @returns {boolean}
     */
    isGestureClick(gestureState)
    {
        return Math.abs(gestureState.dx) < 5  && Math.abs(gestureState.dy) < 5;
    }

    /**
     * @param gestureState
     * @returns {boolean}
     */
    isValidDirectionSwipe(gestureState)
    {
        const {vy, dx} = gestureState;
        return this.isValidSwipe(vy, this.props.velocityThreshold, dx, this.props.directionalOffsetThreshold);
    }

    /**
     * isValidSwipe
     * @param velocity
     * @param velocityThreshold
     * @param directionalOffset
     * @param directionalOffsetThreshold
     * @returns {boolean}
     */
    isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold)
    {
        return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
    }

    /**
     * render
     * @returns {XML}
     */
    render()
    {
        const styles = Styles(_.extend(
            {},
            this.props,
            this.props.style ? this.props.style : {},
            {width: this.props.size, height: this.props.size, panelSize: this.panelSize},
        ));

        return (
            <View style={styles.swipeBoxContainer} {...this.responders.panHandlers}>
                <Animated.View
                    style={[
                        {transform: [{translateY: this.state.bounceValue}]}
                    ]}
                >

                    {this.props.tiles.map((item, index) => {

                        return (
                            <View key={index} style={styles.swipeBox}>
                                {React.isValidElement(item) ? item : (
                                    <Text style={styles.swipeBoxText}>{item}</Text>
                                )}
                            </View>
                        )
                    })}

                </Animated.View>
            </View>
        );
    }
}