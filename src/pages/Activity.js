import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { BarChart } from 'react-native-chart-kit';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import activityStyles from '../styles/activityStyles';

const data = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    datasets: [
      {
		data: [20, 45, 28, 55, 70, 43, 15],
	  },
	],
};

const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFF", 
	backgroundGradientToOpacity: 0,
	fillShadowGradient: 'rgb(33, 71, 214)',
	fillShadowGradientOpacity: 1,
	barRadius: 8,
	strokeWidth: 0,
    color: (opacity = 1) => `rgba(33, 71, 214, ${opacity})`,
	barPercentage: 0.5,
};

export default function Activity() {
	return (
		<SafeAreaView forceInset={{top: 'always'}} style={ activityStyles.container }>
    		<View style={ activityStyles.topInfo }>
        		<View style={ activityStyles.topInfoTexts }>
          			<View style={ activityStyles.topInfoTextsTitle }>
            			<Text style={ activityStyles.topInfoTextsTitleFont }>Olá, Humano</Text>
          			</View>
          			<View style={ activityStyles.topInfoTextsSubtitle }>
            			<Text style={ activityStyles.topInfoTextsSubtitleFont }>Eu preciso correr!</Text>
          			</View>
        		</View>
        		<View style={ activityStyles.topInfoImg }>
          			<Image
            		style={ activityStyles.topInfoImg }
            		source={require('../../assets/dog.jpg')}
          			/>
        		</View>
    	  	</View>
	  		<View style= { activityStyles.middleInfo }>
				<View style={ activityStyles.middleInfoLabel }>
					<Text style={ activityStyles.middleInfoLabelText }>Distância percorrida</Text>
				</View>
				<View style={ activityStyles.middleInfoInformation }>
					<Text style={ activityStyles.middleInfoInformationText }>750 metros</Text>
				</View>
				<View style={ activityStyles.middleInfoPack }>
					<View style={ activityStyles.middleInfoPackView }>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={ activityStyles.middleInfoPackTitle }>Calorias</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={ activityStyles.middleInfoPackSubtitle }>200</Text>
						</View>
					</View>
					<View style={ activityStyles.middleInfoPackView }>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={ activityStyles.middleInfoPackTitle }>Passos</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={ activityStyles.middleInfoPackSubtitle }>150</Text>
						</View>
					</View>
					<View style={ activityStyles.middleInfoPackView }>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={ activityStyles.middleInfoPackTitle }>Tempo</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={ activityStyles.middleInfoPackSubtitle }>30 min</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={ activityStyles.chartInfo }>
				<BarChart
					data={data}
					width={responsiveWidth(90)}
					height={responsiveHeight(30)}
					chartConfig={chartConfig}
					showBarTops={false}
					withInnerLines={false}
					fromZero={true}
					/>
			</View>
		</SafeAreaView>
	);
}