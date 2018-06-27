/**
 * @imports
 */
import { StyleSheet} from 'react-native';


/**
 * @styles
 */
export default props => StyleSheet.create({


    swipeBoxContainer: {
        overflow: 'hidden',
        margin: 10,
        height: props.height,
        width: props.width,
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
    },

    swipeBox: {
        flex: 0,
        height: props.height,
        width: props.width,
        justifyContent: 'center' ,
        alignItems: 'center',
    },

    swipeBoxText: {
        color: props.textColor,
        fontSize: props.fontSize || props.panelSize * 0.5,
    }

});
