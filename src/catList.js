import React, { Component } from "react";
import ParseString from "react-native-xml2js";
import { SafeAreaView } from 'react-navigation';

import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Text,
  Dimensions,
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import ViewShot from "react-native-view-shot";
import ImagePicker from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import CatNames from "cat-names";
import { Col, Row, Grid } from 'react-native-easy-grid';

const DIMS = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width
};

class CatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageArray: [],
    };
  }

  componentDidMount() {
    this.catRequest();
  }

  catRequest = () => {
    let imageArray;
    //const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    const url =
      "http://thecatapi.com/api/images/get?format=xml&size=small&type=jpg&results_per_page=20";

    fetch(url)
      .then(res => res.text())
      .then(res => {
        ParseString.parseString(res, (err, result) => {
          this.setState({
            imageArray: result.response.data[0].images[0].image
          });
        }).catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log("inRender", this.state.imageArray);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{display:'flex', justifyContent:'center', backgroundColor:'black', height: DIMS.width * 0.07, marginVertical: DIMS.width*0.04 }}>
          <Text style={{color:'white', fontSize: DIMS.width * 0.06, fontWeight:'bold', marginLeft: DIMS.width*0.02 }}>CAT LIST</Text>
        </View>
      <ScrollView style={{marginHorizontal:DIMS.width*0.03}}>




        <FlatList
          data={this.state.imageArray}
          keyExtractor={item => item.source_url[0]}
          renderItem={({ item }) =>
             <View >
               <Grid style={{backgroundColor:'silver', marginTop: DIMS.width * 0.02}}>
                 <Col size={33} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>

                   <Text style={{ color:'white', fontSize: DIMS.width*0.045, fontWeight:'bold'}}>{CatNames.random().toUpperCase()}</Text>

                 </Col>
                 <Col size={67}>
            <Image
              style={{ height: 150, width: 'auto' }}
              source={{
                uri: item.url[0]
              }}
            />
          </Col>
          </Grid>
          </View>
          }
        />

      </ScrollView>
    </SafeAreaView>

    );
  }
}

export default CatList;
