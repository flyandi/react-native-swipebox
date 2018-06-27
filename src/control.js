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
export default class PickerBox extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        backgroundColor: PropTypes.string,
        borderColor: PropTypes.string,
        borderWidth: PropTypes.number,
        borderRadius: PropTypes.number,
        textColor: PropTypes.number,
        style: PropTypes.any,
        onSwipeUp: PropTypes.func,
        onSwipeDown: PropTypes.func,
        width: PropTypes.number,
        height: PropTypes.number,
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
        borderColor: '#828186',
        borderWidth: 1,
        borderRadius: 3,
        textColor: '#FFFFFF',
        style: {},
        width: 120,
        height: 120,
        tiles: [],
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    }

    /**
     * isValidSwipe
     * @param velocity
     * @param velocityThreshold
     * @param directionalOffset
     * @param directionalOffsetThreshold
     * @returns {boolean}
     */
    static isValidSwipe = (velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) =>
    {
        return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
    }

    /**
     * @constructor
     * @param props
     */
    constructor(props, context)
    {
        super(props, context);

        this.panelSize = this.props.height > this.props.width ? this.props.height : this.props.width;

        this.state = {
            bounceValue: new Animated.Value(0),
        };

        this.currentPosition = 0;
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

            if( dy > 0) {
                toValue -= this.panelSize;
            } else {
                toValue += this.panelSize;
            }

            if(toValue > 0) toValue = 0;

            const max = -1 * (this.props.tiles.length - 1) * this.props.panelSize;
            if(toValue <= max) toValue = max;

            this.currentPosition = toValue;

            Animated.spring(
                this.state.bounceValue,
                {
                    toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
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
        return PickerBox.isValidSwipe(vy, this.props.velocityThreshold, dx, this.props.directionalOffsetThreshold);
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
            {panelSize: this.panelSize}
        ));

        return (
            <View style={styles.pickerBoxContainer} {...this.responders.panHandlers}>
                <Animated.View
                    style={[
                        {transform: [{translateY: this.state.bounceValue}]}
                    ]}
                >

                    {this.props.tiles.map((item, index) => {

                        return (
                            <View key={index} style={styles.pickerBox}>
                                {React.isValidElement(item) ? item : (
                                    <Text style={styles.pickerBoxText}>{item}</Text>
                                )}
                            </View>
                        )
                    })}

                </Animated.View>
            </View>
        );
    }
}

