import React, { Component } from "react";
import Modal from "react-native-modal";

import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions
} from "react-native";

const DIMS = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width
};

export default class StickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  flash = () => {
    () => this.scrollViewRef.flashScrollIndicators();
  };

  componentWillReceiveProps(newProps) {
    if (newProps.stickerModal) {
      setTimeout(this.flash, 2000);
    }
  }

  render() {
    const stickers1 = [];
    const stickers2 = [];
    this.props.images.map((sticker, i) => {
      i % 2 === 0 ? stickers1.push(sticker) : stickers2.push(sticker);
    });
    const stickerDisplay = stickers1.map((sticker1, i) => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 0,
            backgroundColor: "transparent"
          }}
          key={`stickers ${i}`}
        >
          <TouchableOpacity
            onPress={() => this.props.closeStickerModal(sticker1.source)}
            style={{
              margin: DIMS.width * 0.05,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: DIMS.width * 0.3,
              height: DIMS.width * 0.3
            }}
          >
            <Image
              style={{
                flex: 1,
                height: DIMS.width * 0.3,
                width: DIMS.width * 0.3
              }}
              source={sticker1.source}
            />
          </TouchableOpacity>
          {stickers2[i] ? (
            <TouchableOpacity
              onPress={() => this.props.closeStickerModal(stickers2[i].source)}
              style={{
                margin: DIMS.width * 0.05,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: DIMS.width * 0.3,
                height: DIMS.width * 0.3
              }}
            >
              <Image
                style={{
                  flex: 1,
                  height: DIMS.width * 0.3,
                  width: DIMS.width * 0.3
                }}
                source={stickers2[i].source}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      );
    });

    return (
      <Modal
        isVisible={this.props.stickerModal}
        backdropOpacity={0}
        animationIn={"slideInLeft"}
        animationOut={"slideOutRight"}
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            marginTop:
              Platform.OS === "ios"
                ? this.props.DIMS.height * 0.03
                : this.props.DIMS.height * 0.015,
            marginBottom: this.props.DIMS.height * 0.5,
            height: this.props.DIMS.height * 0.93,
            width: this.props.DIMS.width * 0.95,
            padding: this.props.DIMS.width * 0.08,
            backgroundColor: "#E3E3E3"
          }
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{
            width: this.props.DIMS.width * 0.85,
            flexDirection: "column"
          }}
          ref={ref => (this.scrollViewRef = ref)}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={[
                { fontSize: this.props.DIMS.width * 0.07, color: "#1A1A1A" }
              ]}
            >
              Choose A Sticker
            </Text>
          </View>

          {stickerDisplay}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.closeModal()}
          style={[
            {
              borderColor: "yellow",
              borderWidth: 1,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: this.props.DIMS.height * 0.01,
              height: this.props.DIMS.height * 0.08,
              width: this.props.DIMS.width * 0.25
            }
          ]}
        >
          <Text style={[{ fontSize: this.props.DIMS.width * 0.07 }]}>
            CLOSE
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}
