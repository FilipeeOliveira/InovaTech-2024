import { forwardRef, useMemo } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark, faEdit, faShare } from "@fortawesome/free-solid-svg-icons";

export const CustomBottomSheetProfilePost = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "50%"]);

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
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "semibold",
                  fontSize: 15,
                }}
              >
                Editar
              </Text>

              <FontAwesomeIcon icon={faEdit} size={20} color="#fbfbfb" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#3c3a3a",
                width: "100%",
                padding: 20,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
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
            <TouchableOpacity
              style={{
                backgroundColor: "#3c3a3a",
                width: "100%",
                padding: 20,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "semibold",
                  fontSize: 15,
                }}
              >
                Salvar
              </Text>

              <FontAwesomeIcon icon={faBookmark} size={20} color="#fbfbfb" />
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
