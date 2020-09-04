import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../utils/Colors";

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: Colors.lighter_green,
  stepStrokeWidth: 1,
  separatorStrokeFinishedWidth: 1,
  stepStrokeFinishedColor: "#ffffff",
  stepStrokeUnFinishedColor: Colors.lighter_green,
  separatorFinishedColor: Colors.lighter_green,
  separatorUnFinishedColor: Colors.lighter_green,
  stepIndicatorFinishedColor: Colors.lighter_green,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: "feed",
    color: stepStatus === "finished" ? "#ffffff" : Colors.lighter_green,
    size: 14,
  };
  switch (position) {
    case 0: {
      iconConfig.name = "check";
      break;
    }
    case 1: {
      iconConfig.name = "location-on";
      break;
    }
    case 2: {
      iconConfig.name = "payment";
      break;
    }
    case 3: {
      iconConfig.name = "done-all";
      break;
    }

    default: {
      break;
    }
  }
  return iconConfig;
};

const OrderSteps = (props) => {
  const status = props.position;
  const [currentPage, setCurrentPage] = useState(status);
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderSteps;
