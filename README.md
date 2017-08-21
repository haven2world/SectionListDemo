# React Native Contacts List
fork 自https://github.com/hzl123456/SectionListDemo
原作者简书地址：http://www.jianshu.com/u/0c4676c691ef

将原作者Demo中的组件抽出

##安装

	npm install --save git://github.com/haven2world/react-native-contacts-list.git
	
##使用
引用组件直接使用，需传参数

	（fun） toRenderSectionHeader(section) 取代 SectionList的 renderSectionHeader（section）

	（fun） toRenderItem(item,index) 取代 SectionList的 renderItem(item,index)

	（number） itemHeight 每一行的高度
	
	（number） headerHeight 每个分组头部的高度

	（array） data 数据组 结构如下
	
	[
		{
			data:[{},{},{}],//每一行的数据
			title:'this is title'//侧边导航栏显示的内容
		},
		{
			data:[{},{},{}],//每一行的数据
			title:'this is title'//侧边导航栏显示的内容
		},
		……
	] 
此外，重写了enableEmptySections，getItemLayout两个参数。

其他参数会被传递给 SectionList 组件。

	

