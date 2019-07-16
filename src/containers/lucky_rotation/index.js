import React from 'react'
import { bindActionCreators } from 'redux'
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import LoginRequired from '../../components/LoginRequired';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog';
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn
} from '../../modules/lucky'
import Wheel from './Winwheel'
import {
	getData
} from '../../modules/profile'
import rotaion from './muivongquay.png'
import bg_rotaion from './khungvongquay.png'

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numberShow:15,
			isAll:true,
			wheelPower:0,
			wheelSpinning:false,
			stop:true,
			theWheel:null,
			dialogLoginOpen: false,
			dialogBonus:false,
			auto: false,
		};
	}
	componentWillMount(){
		
	}

	componentDidMount(){
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getRotationDetailDataUser(user.access_token, 0).then(()=>{
				var data=this.props.dataRotationWithUser;
				console.log(data)
			});
		} else {
			this.props.getRotationDetailData(0).then(()=>{
				var data=this.props.dataRotation;
				console.log(data)
			});
		}
		let theWheel = new Wheel({
			'numSegments'       : 4,         // Specify number of segments.
			'outerRadius'       : 150,       // Set outer radius so wheel fits inside the background.
			'drawMode'          : 'image',   // drawMode must be set to image.
			'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
			'textFontSize'      : 12,        // Set text options as desired.
			'textOrientation'   : 'curved',
			'textDirection'     : 'reversed',
			'textAlignment'     : 'outer',
			'textMargin'        : 5,
			'textFontFamily'    : 'monospace',
			'textStrokeStyle'   : 'black',
			'textLineWidth'     : 2,
			'responsive'   : true,
			'textFillStyle'     : 'white',
			
			'animation' :                   // Specify the animation to use.
			{
				'type'     : 'spinToStop',
				'duration' : 5,     // Duration in seconds.
				'spins'    : 10,     // Number of complete spins.
				'callbackFinished' : this.alertPrize
			}
		});

		let loadedImg = new Image();
		loadedImg.onload = function()
		{
			theWheel.wheelImage = loadedImg;    // Make wheelImage equal the loaded image object.
			theWheel.draw();                    // Also call draw function to render the wheel.
		}

		// Set the image source, once complete this will trigger the onLoad callback (above).
		// loadedImg.width=400;
		// loadedImg.height=400;
		loadedImg.src = rotaion;
		this.setState({theWheel:theWheel})
	}

	start=()=>{
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			// this.props.getDetailData(user.access_token, idLucky);
			// this.props.getData(user.access_token, user.scoinAccessToken).then(()=>{
			// 	console.log(this.props.dataProfile)
			// });

			this.props.pickCard(user.access_token, 119).then(()=>{
				if(_this.props.dataPick !==undefined){
					console.log(_this.props.dataPick)
				}
			})
			this.startSpin();
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	startSpin=()=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		// Ensure that spinning can't be clicked again while already running.
		if (wheelSpinning == false) {
			
			// Based on the power level selected adjust the number of spins for the wheel, the more times is has
			// to rotate with the duration of the animation the quicker the wheel spins.
			// theWheel.animation.spins = 2;

			// Disable the spin button so can't click again while wheel is spinning.

			// Begin the spin animation by calling startAnimation on the wheel object.
			theWheel.startAnimation();

			// Set to true so that power can't be changed and spin button re-enabled during
			// the current animation. The user will have to reset before spinning again.
			this.setState({wheelSpinning: true, stop:false});
		}
	}
	
	stopSpin=()=>{
		const {wheelSpinning, wheelPower, theWheel, stop}=this.state;
		if (stop == false) {

			theWheel.stopAnimation(false);
			theWheel.animation.spins = 1;
			theWheel.rotationAngle = 0;
			theWheel.draw(); 
			theWheel.startAnimation();
			// theWheel.stopAnimation(false);
			this.setState({wheelSpinning: true, stop:true});
		}
	}

	resetWheel=()=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		theWheel.stopAnimation(false);
		theWheel.animation.spins = 20;  // Stop the animation, false as param so does not call callback function.
		theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
		theWheel.draw();                // Call draw to render changes to the wheel.

		this.setState({wheelSpinning: false});          // Reset to false to power buttons and spin can be clicked again.
	}

	alertPrize=(indicatedSegment)=>{
		// Do basic alert of the segment text. You would probably want to do something more interesting with this information.
		alert("The wheel stopped on " + indicatedSegment.text);
	}

	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};

	render() {
		const {dialogLoginOpen, dialogBonus, auto}=this.state
		return (
			<Grid container>
			<Grid item xs={12} style={{ padding:10}}>
				<div className='the_wheel' style={{backgroundImage:"url(" + bg_rotaion + ")", width:684, height:804, alignContent:'center', verticalAlign:'center', dataResponsiveMinWidth:180, dataResponsiveScaleHeight:"true"}}>
					<canvas id="canvas" width="684" height="804">
						<p style={{color: '#fff', textAlign:'center'}} >Sorry, your browser doesn't support canvas. Please try another.</p>
					</canvas>
				</div>
				<div>
					<div>
						<span>Tự động quay</span>
						<input type="checkbox" style={{width:25, height:25}} onChange={this.handleChange}/>
					</div>
					<div>
						<button onClick={this.start}>Start</button>
						<button onClick={this.stopSpin}>Stop</button>
						<button onClick={this.resetWheel}>Play Again</button>
					</div>
				</div>
			</Grid>
			<Grid item xs={12}>
				<div style={{textAlign:'center', marginBottom:25, fontSize:14}}>
					<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
					<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
					<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
				</div>
			</Grid>
			<Dialog
					fullScreen={false}
					open={dialogBonus}
					onClose={this.handleCloseMoreTurnDialog}
					aria-labelledby="responsive-dialog-title"
					style={{ background: "#fff" }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: '#666666', fontSize:18 }} >Bạn đã hết lượt lật thẻ</span></DialogTitle>
					<DialogContent>
						<div style={{ color: "#666666" }}>
							Làm nhiệm vụ hoặc mua thêm lượt để tiếp tục
						</div>
					</DialogContent>
					<DialogActions>
						<div>
							<button onClick={this.handleCloseMoreTurnDialog} className="btn_close_lucky">Xác nhận</button>
						</div>
					</DialogActions>
				</Dialog>
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</Grid>
		)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getData,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)