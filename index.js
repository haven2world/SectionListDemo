import React, {Component} from 'react'
import {SectionList, Text, View, StyleSheet, Platform,FlatList} from 'react-native'
import SiderSectionList from './SiderSectionList'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'


let _this;
export  default class List extends Component {
    constructor(props) {
        super(props);
        _this = this;

        this.state = {
            data: [],
            sections: [],
        }
        this.getItemLayout = null;
        this.list = null;
    }
    componentDidMount(){
        this.getData(this.props);
    }
    componentWillReceiveProps(nextProps){
        this.getData(nextProps);
    }
    getData = (props)=>{
        let data = props.data?props.data:[];
        //SectionList的数据源
        let dataSource = [];
        //分组头的数据源
        let dataSection = [];
        for (let i = 0; i < data.length; i++) {
            //给右侧的滚动条进行使用的
            dataSection[i] = data[i].title;
            let section = {}
            section.title = data[i].title;
            section.data = data[i].data;
            for (let j = 0; j < section.data.length; j++) {
                section.data[j].key = j
            }

            dataSource[i] = section;
        }
        let separatorHeight = props.separatorHeight?props.separatorHeight:0;
        let itemHeight = props.itemHeight? props.itemHeight:50;
        let headerHeight = props.headerHeight?props.headerHeight:0;
        let footerHeight = props.footerHeight?props.footerHeight:0;
        this.getItemLayout = sectionListGetItemLayout({
           // The height of the row with rowData at the given sectionIndex and rowIndex
           getItemHeight: (rowData, sectionIndex, rowIndex) => itemHeight,

           // These three properties are optional
           getSeparatorHeight: () => separatorHeight , // The height of your separators
           getSectionHeaderHeight: () => headerHeight, // The height of your section headers
           getSectionFooterHeight: () => footerHeight, // The height of your section footers
        })

        this.setState({data: dataSource, sections: dataSection})

    }

    render() {
        if (this.state.data.length > 0) {
            return (
                <View style={{flex:1}}>
                    <View>
                        <SectionList
                            ref={(component)=>{this.list = component;this.props.getRef(component)}}
                            enableEmptySections
                            renderItem={this._renderItem}
                            renderSectionHeader={this._renderSectionHeader}
                            sections={this.state.data}
                            getItemLayout={this.getItemLayout}
                            {...this.props}
                               />

                        <SiderSectionList
                            sections={ this.state.sections}
                            onSectionSelect={this._onSectionselect}/>

                    </View>
                </View>
            )
        } else {
            return <View/>
        }
    }

    //这边返回的是A,0这样的数据
    _onSectionselect = (section, index) => {
        //跳转到某一项
        if(_this.list){
            _this.list.scrollToLocation({animated: true, sectionIndex:index,itemIndex:0,viewOffset:this.props.headerHeight?this.props.headerHeight:0})
        }
    }
    _renderItem = ({item,index,section}) => {
        if(this.props.toRenderItem){
            return this.props.toRenderItem(item,index,section)
        }else{
            return (
                <View style={styles.itemView}>
                    <Text style={{marginLeft: 30, fontSize: 16, color: '#333'}}>
                        {index}
                    </Text>
                </View>
            )
        }

    }

    _renderSectionHeader = ({section}) => {
        if(this.props.toRenderSectionHeader){
            return this.props.toRenderSectionHeader(section);
        }        
    }
}



const styles = StyleSheet.create({

    headerView: {
        justifyContent: 'center',
        height: 24,
        paddingLeft: 20,
        backgroundColor: '#eee'
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3cb775'
    },
    itemView: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height: 50
    }
});
