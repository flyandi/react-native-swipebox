/**
 * @imports
 */
import { StyleSheet} from 'react-native';


/**
 * @styles
 */
export default props => StyleSheet.create({

    pickerContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
        flex: 1,
        margin: props.margin,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pickerBoxContainer: {
        overflow: 'hidden',
        margin: 10,
        height: props.height,
        width: props.width,
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
    },

    pickerBox: {
        flex: 0,
        height: props.height,
        width: props.width,
        justifyContent: 'center' ,
        alignItems: 'center',
    },

    pickerBoxText: {
        color: props.textColor,
        fontSize: props.panelSize * 0.5,
    }

});
