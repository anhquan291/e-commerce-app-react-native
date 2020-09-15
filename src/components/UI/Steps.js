import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: Colors.lighter_green,
  stepStrokeWidth: 2,
  separatorStrokeFinishedWidth: 3,
  stepStrokeFinishedColor: Colors.lighter_green,
  stepStrokeUnFinishedColor: Colors.lighter_green,
  separatorFinishedColor: Colors.lighter_green,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.lighter_green,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.lighter_green,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: Colors.lighter_green,
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : Colors.lighter_green,
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'shopping-cart';
      break;
    }
    case 1: {
      iconConfig.name = 'assessment';
      break;
    }
    case 2: {
      iconConfig.name = 'location-on';
      break;
    }
    case 3: {
      iconConfig.name = 'payment';
      break;
    }

    default: {
      break;
    }
  }
  return iconConfig;
};

const Steps = (props) => {
  const status = props.position;
  const [currentPage, setCurrentPage] = React.useState(status);
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          stepCount={4}
          currentPosition={currentPage}
          renderStepIndicator={renderStepIndicator}
          labels={['Chưa xác nhận', 'Xác nhận', 'Đang giao', 'Nhận hàng']}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  stepIndicator: {
    marginTop: 20,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.lighter_green,
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});

export default Steps;
