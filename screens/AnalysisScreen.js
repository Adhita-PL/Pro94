import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import db from "../config.js";
import MyHeader from '../components/MyHeader'

export default class AnalysisScreen extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            userId: firebase.auth().currentUser.email,

            groceriesBudget : 0,
            rentBudget : 0,
            billsBudget : 0,
            entertainmentBudget : 0,
            kidsBudget : 0,
            fuelBudget : 0,
            otherBudget : 0,

            groceriesExpense : 0,
            rentExpense : 0,
            billsExpense : 0,
            entertainmentExpense : 0,
            kidsExpense : 0,
            fuelExpense : 0,
            otherExpense : 0,
        }
    }
    getBudget = () => {
        db.collection("budget").where("user_id", '==', this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    groceriesBudget : doc.data().groceries,
                    rentBudget : doc.data().rent,
                    billsBudget : doc.data().bills,
                    entertainmentBudget : doc.data().entertainment,
                    kidsBudget : doc.data().kids,
                    fuelBudget : doc.data().fuel,
                    otherBudget : doc.data().other,
                })
            })
        })
    }
    getExpense = () => {
        db.collection("expenses").where("user_id", '==', this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    groceriesExpense : doc.data().groceries,
                    rentExpense : doc.data().rent,
                    billsExpense : doc.data().bills,
                    entertainmentExpense : doc.data().entertainment,
                    kidsExpense : doc.data().kids,
                    fuelExpense : doc.data().fuel,
                    otherExpense : doc.data().other,
                })
            })
        })
    }
    componentDidMount() {
        this.getBudget();
        this.getExpense();
    }
    render() {
        return(
            <View>
                <MyHeader 
                    navigation = {this.props.navigation}
                    title = "Analysis"
                /> 
                <ScrollView>
                    <View>
                        <Text style = {styles.heading}>Groceries</Text>
                        <View>
                            <Text>Limit : {this.state.groceriesBudget}</Text>
                            <Text>Spent : {this.state.groceriesExpense} </Text>
                            <Text>Remaining :</Text>
                        </View>
                    </View>
                    <View>
                        <Text style = {styles.heading}>Rent</Text>
                        <View>
                            <Text>Limit : {this.state.rentBudget}</Text>
                            <Text>Spent : {this.state.rentExpense} </Text>
                            <Text>Remaining :</Text>
                        </View>
                    </View>
                    <View>
                        <Text style = {styles.heading}>Bills</Text>
                        <View>
                            <Text>Limit : {this.state.billsBudget}</Text>
                            <Text>Spent : {this.state.billsExpense} </Text>
                            <Text>Remaining :</Text>
                        </View>
                    </View>
                    <View>
                        <Text style = {styles.heading}>Entertainment</Text>
                        <View>
                            <Text>Limit : {this.state.entertainmentBudget}</Text>
                            <Text>Spent : {this.state.entertainmentExpense} </Text>
                            <Text>Remaining :</Text>
                        </View>
                    </View>
                    <View>
                        <Text style = {styles.heading}>Kids</Text>
                        <View>
                            <Text>Limit : {this.state.kidsBudget}</Text>
                            <Text>Spent : {this.state.kidsExpense}</Text>
                            <Text>Remaining :</Text>
                        </View>
                    </View>
                    <View>
                        <Text style = {styles.heading}>Fuel</Text>
                        <View>
                            <Text>Limit : {this.state.fuelBudget}</Text>
                            <Text>Spent : {this.state.fuelExpense}</Text>
                            <Text>Remaining :</Text>
                        </View>
                    </View>
                    <View>
                        <Text style = {styles.heading}>Other</Text>
                        <View>
                            <Text>Limit : {this.state.otherBudget}</Text>
                            <Text>Spent : {this.state.otherExpense}</Text>
                            <Text>Remaining :</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    heading : {
        fontSize : RFValue(20)
    },
})