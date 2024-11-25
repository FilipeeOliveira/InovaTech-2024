import { forwardRef, useMemo } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark, faShare } from "@fortawesome/free-solid-svg-icons";
import { handleSharePost } from "../../utils/share";

export const CustomBottomSheetPost = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "50%"]);

  console.log(props.postInformation);

  const post = props.postInformation;

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          index={1}
          backgroundStyle={{ backgroundColor: "#292828" }}
          handleIndicatorStyle={{
            backgroundColor: "#fff",
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "#3c3a3a",
                width: "100%",
                padding: 20,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onPress={() => handleSharePost(post.title, post.body, post.image)}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "semibold",
                  fontSize: 15,
                }}
              >
                Compartilhar
              </Text>

              <FontAwesomeIcon icon={faShare} size={20} color="#fbfbfb" />
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 20,
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "static",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#292828",
    padding: 20,
    flexDirection: "column",
    gap: 10,
  },
});
