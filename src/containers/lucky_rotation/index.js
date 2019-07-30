import React from 'react'
import { bindActionCreators } from 'redux'
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import LoginRequired from '../../components/LoginRequired';
import Pagination from "react-js-pagination";
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog';
import { withStyles } from "material-ui/styles/index"
import { connect } from 'react-redux'
import './css/style.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
} from '../../modules/lucky'
import Wheel from './Winwheel'
import {
	getData
} from '../../modules/profile'
import rotaion from './images/muivongquay.png'
import bg_rotaion from './khungvongquay.png'

import backtotop from './images/backtotop.png'
import sukiendangdienra from './images/btn-sukiendangdienra.png'
import sapdienra from './images/btn-sapdienra.png'
import ketthuc from './images/btn-ketthuc.png'
import logo from './images/logo.png';
import thamgiangay from './images/btn-thamgiangay.gif';
import logo_p2 from './images/logo-p2.png';
import vqmm_p2 from './images/vqmm-p2.png';
import btn_quay_p2 from './images/btn-quay-p2.png';
import honda from './images/honda.png';
import iphone_xs from './images/iphone-xs.png';
import icon_bangvinhdanh from './images/icon-bangvinhdanh.png';
import logo_splay from './images/logo_splay.png';
import logo_scoin from './images/logo_scoin.png';
import img_phanthuong from './images/img-phanthuong.png';
import btn_close from './images/btn-close.png';
import img_card10k from './images/img-card10k.png';
import img_card50k from './images/img-card50k.png';
import img_card100k from './images/img-card100k.png';
import img_card500k from './images/img-card500k.png';
import img_thele from './images/img-thele.png';
import img_tudo from './images/img-tudo.png';
import img_maduthuong from './images/img-maduthuong.png';
import img_thongbao from './images/img-thongbao.png';
import muiten from './images/muiten.png';
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

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
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			userTurnSpin:{},
			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			numberItemInpage:5,
			activeCodeBonus:1,
			activeVinhDanh:1,
			activeTuDo:1,
			countVinhDanh:0,
			countTuDo:0,
			countCodeBonus:0,
			dataVinhDanh:[],
			dataTuDo:[],
			dataCodeBonus:[],
			listVinhDanh:[],
			listTuDo:[],
			listCodeBonus:[],
			width:0,
			height:0,
			img_width:0,
			img_height:0,
			code:true,
			inputValue: '',
			noti_mdt:false,
			noti_tudo:false,
			numberPage:3,
			img_status: sukiendangdienra,
			message_status:'',
		};
	}
	componentWillMount(){
		if (window.innerWidth <= 320) {
			this.setState({ width: 242, height: 378, img_width:280, img_height:280});
		}
		if (window.innerWidth > 320 && window.innerWidth <= 480) {
			this.setState({ width: 260, height: 405, img_width:300, img_height:300});
		}
		if (window.innerWidth > 480 && window.innerWidth <= 600) {
			this.setState({ width: 400, height: 500, img_width:500, img_height:500});
		}
		if (window.innerWidth > 600 && window.innerWidth <= 768) {
			this.setState({ width: 485, height: 500, img_width:560, img_height:560});
		}
		if (window.innerWidth > 768 && window.innerWidth < 1024) {
			this.setState({ width: 650, height: 700, img_width:750, img_height:750});
		}
		if (window.innerWidth >= 1024) {
			this.setState({ width: 645, height: 830, img_width:752, img_height:752});
		}
		window.removeEventListener('scroll', this.handleScroll);
	}



	componentDidMount(){
		const {img_width, img_height}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getRotationDetailDataUser(user.access_token, 0).then(()=>{
				var data=this.props.dataRotationWithUser;
				if(data!==undefined){
					this.getStatus(data.luckySpin)
					this.timeRemain(data.luckySpin.endDate)
					this.setState({userTurnSpin:data.userTurnSpin, itemOfSpin:data.itemOfSpin, luckySpin:data.luckySpin, turnsFree:(data.userTurnSpin.turnsFree+data.userTurnSpin.turnsBuy), isLogin:true})
				}
			});
		} else {
			this.props.getRotationDetailData(0).then(()=>{
				var data=this.props.dataRotation;
				if(data!==undefined){
					this.getStatus(data.luckySpin)
					this.timeRemain(data.luckySpin.endDate)
					this.setState({userTurnSpin:data.userTurnSpin, itemOfSpin:data.itemOfSpin, luckySpin:data.luckySpin, turnsFree:(data.userTurnSpin.turnsFree+data.userTurnSpin.turnsBuy), isLogin:false})
				}
			});
		}
		this.props.getVinhDanh(0).then(()=>{
			var data=this.props.dataVinhDanh;
			if(data!==undefined){	
				this.setState({dataVinhDanh:data, countVinhDanh:data.length, listVinhDanh:data.slice(0, 10)})
			}
		});
		let theWheel = new Wheel({
			'numSegments'       : 10,         // Specify number of segments.
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

			'animation' :                 
			{
				'type'     : 'spinToStop',
				'duration' : 5,    
				'spins'    : 10,    
				'callbackFinished' : this.completeRotation
			}
		});

		let loadedImg = new Image();
		loadedImg.onload = function()
		{
			theWheel.wheelImage = loadedImg;   
			theWheel.draw();                    
		}
		loadedImg.width=img_width;
		loadedImg.height=img_height;
		loadedImg.src = rotaion;
		this.setState({theWheel:theWheel})
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		this.setState({ auto : !this.state.auto, wheelSpinning: true});
	}

	getStatus=(luckySpin)=>{
		var start=luckySpin.startDate;
		var end=luckySpin.endDate;
		var time=Date.now();

		var distance_3day=start - 3 * 86400 * 1000;
		var duration=end-time;

		if (time > distance_3day && time < start) {
			this.setState({ img_status: sapdienra, message_status:"Sự kiện chưa diễn ra."});
		}
		if (time > start && time < end) {
			this.setState({ img_status: sukiendangdienra});
		}
		if (time > end) {
			this.setState({ img_status: ketthuc, message_status:"Sự kiện đã kết thúc."});
		}
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}

	loginAction = () => {
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		// window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
		window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}
	logoutAction = () => {
		localStorage.removeItem("user");
		// window.location.replace(
		// 	`https://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );

		window.location.replace(
			`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);
	}

	start=()=>{
		const {turnsFree, itemOfSpin, luckySpin}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var time=Date.now();
		if(time > luckySpin.endDate || time < luckySpin.startDate){
			$('#myModal8').modal('show');
		}else{
			if (user !== null) {
				if(turnsFree>0){
					this.props.pickCard(user.access_token, luckySpin.id).then(()=>{
						if(_this.props.dataPick !==undefined){
							if(_this.props.dataPick.item.type==="LUCKY_NUMBER"){
								this.setState({code:true})
								setTimeout(()=>{
									this.setState({noti_mdt:true})
								},4000)
							}else{
								if(_this.props.dataPick.item.keyName!=="matluot"){
									setTimeout(()=>{
										this.setState({noti_tudo:true})
									},4000)
									
								}
								this.setState({code:false})
								
							}
							this.setState({itemBonus: _this.props.dataPick.item})
							var id=_this.props.dataPick.id;
							var pos = itemOfSpin.map(function(e) { return e.id; }).indexOf(id);
							this.resetWheel();
							this.startSpin(pos+1);
						}
					})
					
				}else{
					$('#myModal6').modal('show');
				}
			} else {
				$('#myModal5').modal('show');
			}
		}
	}

	startSpin=(segmentNumber)=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		if (wheelSpinning == false) {
			let stopAt = theWheel.getRandomForSegment(segmentNumber);
			theWheel.animation.stopAngle = stopAt;
			theWheel.startAnimation();
			this.setState({wheelSpinning: true, stop:false});
		}
	}
	
	// stopSpin=()=>{
	// 	const {wheelSpinning, wheelPower, theWheel, stop}=this.state;
	// 	if (stop == false) {

	// 		theWheel.stopAnimation(false);
	// 		theWheel.animation.spins = 1;
	// 		theWheel.rotationAngle = 0;
	// 		theWheel.draw(); 
	// 		theWheel.startAnimation();
	// 		// theWheel.stopAnimation(false);
	// 		this.setState({wheelSpinning: true, stop:true});
	// 	}
	// }

	resetWheel=()=>{
		const { theWheel}=this.state;
		theWheel.stopAnimation(false);
		theWheel.animation.spins = 10; 
		theWheel.rotationAngle = 0;   
		theWheel.draw();              
		this.setState({wheelSpinning: false});    
	}

	completeRotation=()=>{
		const {auto, turnsFree, theWheel, itemBonus}=this.state;
		if(auto){
			if(turnsFree>0){
				   this.showPopup()
			}
			
		}else{
			if(itemBonus.keyName!=="matluot"){
				$('#myModal4').modal('show');
			}
		}
		this.getDetailData()
		
		
	}

	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};


	getDetailData=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getRotationDetailDataUser(user.access_token, 0).then(()=>{
			var data=this.props.dataRotationWithUser;
			if(data!==undefined){
				this.setState({turnsFree:(data.userTurnSpin.turnsFree+data.userTurnSpin.turnsBuy)})
			}
		});
	}

	showPopup=()=>{
		const {itemBonus, turnsFree}=this.state;

		setTimeout(()=>{
			$('#myModal4').modal('hide');
			if(turnsFree>0){
				this.start()
			}
		},2000)
		if(itemBonus.keyName!=="matluot"){
			$('#myModal4').modal('show');
		}
	}

	timeRemain=(toDate)=>{
		var _this=this;
		setInterval(()=>{
			var time=(toDate-Date.now())/1000;
			var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
			var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
			var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
			var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
			_this.setState({day:day, hour: hour, minute: minute, second:second})
		}, 1000);
	}



	showModalBonus=()=>{
		$('#myModal').modal('show'); 
	}

	hideModalBonus=()=>{
		$('#myModal').modal('hide');
	}

	showModalRules=()=>{
		$('#myModal1').modal('show'); 
	}

	hideModalRules=()=>{
		$('#myModal1').modal('hide');
	}

	showModalTuDo=()=>{
		const {luckySpin}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getTuDo(user.access_token, luckySpin.id).then(()=>{
				var data=this.props.dataTuDo;
				if(data!==undefined){
					this.setState({dataTuDo:data, countTuDo:data.length, listTuDo: data.slice(0,5), noti_tudo:false})
				}
			});
			$('#myModal4').modal('hide');
			$('#myModal2').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	hideModalTuDo=()=>{
		$('#myModal2').modal('hide');
	}

	showModalCodeBonus=()=>{
		const {luckySpin}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.getCodeBonus(user.access_token, luckySpin.id, 'LUCKY_NUMBER').then(()=>{
				var data=this.props.dataCodeBonus;
				if(data!==undefined){
					this.setState({dataCodeBonus:data, countCodeBonus:data.length, listCodeBonus: data.slice(0,5), noti_mdt:false})
				}
			});
			$('#myModal4').modal('hide');
			$('#myModal3').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	hideModalCodeBonus=()=>{
		$('#myModal3').modal('hide');
	}

	showModalDetailBonus=()=>{
		$('#myModal4').modal('show');
	}

	hideModalDetailBonus=()=>{
		$('#myModal4').modal('hide');
	}

	// hideModalCode=()=>{
	// 	$('#myModal7').modal('hide');
	// }


	handlePageChangeTuDo=(pageNumber)=> {
		const {dataTuDo}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeTuDo: pageNumber, listTuDo: dataTuDo.slice(newPosition, newPosition+5)});
	}

	handlePageChangeCodeBonus=(pageNumber)=> {
		const {dataCodeBonus}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeCodeBonus: pageNumber, listCodeBonus: dataCodeBonus.slice(newPosition, newPosition+5)});
	}

	handlePageChangeVinhDanh=(pageNumber)=> {
		const {dataVinhDanh}=this.state;
		var newPosition=(pageNumber-1)*10
		this.setState({activeVinhDanh: pageNumber, listVinhDanh: dataVinhDanh.slice(newPosition, newPosition+10)});
	}

	openTabNapScoin=(url)=> {
		window.open(url, '_blank').focus();
	}

	findCode=(evt)=>{
		var value=evt.target.value
		// this.setState({
		// 	inputValue: evt.target.value
		//   });
		const {dataCodeBonus}=this.state;
		var data=dataCodeBonus.filter(v=>v.description.indexOf(value)!==-1)
		this.setState({countCodeBonus:data.length, listCodeBonus:data.slice(0,5)})
	}

	render() {
		const {height, width, dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning, isLogin, userTurnSpin, day, hour, minute, second, code,numberPage, img_status, message_status,
			 activeTuDo, activeCodeBonus, activeVinhDanh, numberItemInpage, countCodeBonus, countTuDo, countVinhDanh, listCodeBonus, listTuDo, listVinhDanh,itemBonus, turnsFree, noti_mdt, noti_tudo}=this.state;
		const { classes } = this.props;
		const notification_mdt=noti_mdt?(<span class="badge badge-pill badge-danger position-absolute noti-mdt">!</span>):(<span></span>);
		const notification_tudo=noti_tudo?(<span class="badge badge-pill badge-danger position-absolute noti-tudo">!</span>):(<span></span>);
		return (<div>
			<a href="#logo" id="button"><img src={backtotop} alt="Back to Top" width="16" /></a>
			<div className="container-fluid page1">
				<div className="content-inner-p1">
					<h1 className="logo-p1" id="logo"><img src={logo} alt="Logo" width="500" className="img-fluid" /></h1>
					<div className="container">
						<div className="timer-p1 float-right">
							<img src={img_status} alt="Sự kiện đang diễn ra" width="298" className="img-fluid" />
							<div className="table-responsive">
							<table className="table table-borderless">
								<tr>
									<td className="cell-timer-p1 text-white display-5 text-center">{day}</td>
									<td className="cell-timer-p1 text-white display-5 text-center">{hour}</td>
									<td className="cell-timer-p1 text-white display-5 text-center">{minute}</td>
									<td className="cell-timer-p1 text-white display-5 text-center">{second}</td>
								</tr>
								<tr>
									<td align="center" className="p-0 h6">Ngày</td>
									<td align="center" className="p-0 h6">Giờ</td>
									<td align="center" className="p-0 h6">Phút</td>
									<td align="center" className="p-0 h6">Giây</td>
								</tr>
							</table>
							</div>
						</div> 
					</div>
					<p className="btn-thamgiangay"><a href="#p2" title="Tham gia ngay"><img src={thamgiangay} alt="Tham gia ngay" width="200" className="img-fluid" /></a></p>
					<div className="position-absolute-p1">
						<ul className="nav flex-column menu-left-p1">
							<li className="pt-6"><a href="http://scoin.vn/" title="Nạp Scoin" target="_blank">Nạp Scoin</a></li>
							<li className="pt-5b"><a href="#" title="Thể lệ" onClick={this.showModalRules}>Thể lệ</a></li>
							<li className="pt-5b"><a href="#" title="Phần thưởng" onClick={this.showModalBonus}>Phần thưởng</a></li>
							<li className="pt-5a"><a href="#bvd" title="Vinh danh">Vinh danh</a></li>
						</ul>
					</div>
				</div>
			</div>
			{/* End p1 */}

			<div id="p2" className="container-fluid page2">
				<div className="container content-inner-p2">
					<h1 className="logo-p2"><img src={logo_p2} alt="Logo" width="600" className="img-fluid" /></h1>
					<div className="vqmm">
							<canvas style={{}} id="canvas" width={width} height={height} data-responsiveMinWidth="180"  data-responsiveScaleHeight="true">		
							</canvas>
							{/* <canvas style={{marginTop:-(height+15), padding:0}} id="new_canvas" width={width} height={height} data-responsiveMinWidth="180"  data-responsiveScaleHeight="true">
								
							</canvas> */}
						{/* <img src={vqmm_p2} alt="Vòng quay may mắn" className="img-fluid"/>     */}
					</div>
					<div className="btn-logout">
						{(isLogin)?(<div><p className="p-0 m-0 text-center">Xin chào {userTurnSpin.currName}</p>
						<h5 className="text-center"><a style={{cursor:'pointer'}} title="Đăng xuất" onClick={this.logoutAction}>Đăng xuất</a></h5></div>):(<h5 className="text-center"><a style={{cursor:'pointer'}} title="Đăng nhập" onClick={this.loginAction}>Đăng nhập</a></h5>)}
						
					</div>
					<div className="btn-quay">
						<h5 className="text-center">Còn: {turnsFree} lượt</h5>
						<a style={{cursor:'pointer'}} onClick={this.start}><img src={btn_quay_p2} alt="" className="img-fluid hv" /></a>
						<div className="custom-control custom-checkbox">
							<input type="checkbox" className="custom-control-input" id="customCheck" name="autospin" />
							<label className="custom-control-label" for="customCheck" onClick={this.handleChange}>Chọn quay tự động</label>
						</div>
					</div>   
				</div>
				
				<div className="menu-right">
					<ul className="nav flex-column">
						<li className="pt-6"><a style={{color:"#fff", cursor:'pointer'}} title="Tủ đồ" onClick={this.showModalTuDo}>Tủ đồ</a>{notification_tudo}</li>
						<li className="pt-5a"><a style={{color:"#fff", cursor:'pointer'}} title="Mã dự thưởng" onClick={this.showModalCodeBonus}>Mã dự thưởng</a>{notification_mdt}</li>
					</ul>
				</div>
			</div>
			{/* End p2 */}

			<div className="container jumbotron">
				<h2 className="d-block btn-ketqua text-center">Kết quả quay số</h2>
				<h4 className="text-center py-2 d-block w-100">Tự động cập nhật theo KQ XSMB lúc 18:30 ngày 08/08/2019</h4>
			
				<div className="card-deck">
					<div className="card">
						<div className="card-body text-center">
						<h4 className="card-title text-uppercase title-giaidacbiet">Giải đặc biệt</h4>
						<p className="card-text title-giaidacbiet">Xe máy Honda Airblade 2019</p>
						<div className="bg-giaithuong d-table-cell align-middle">
							<img src={honda} alt="Xe máy" className="img-fluid" />
						</div>
						<h5 className="card-title">Mã số trúng thưởng</h5>
						<h5 className="card-title" style={{color:'red'}}>Chưa có</h5>
						</div>
					</div>
					<div className="card">
						<div className="card-body text-center">
						<h4 className="card-title text-uppercase title-giaidacbiet">Giải nhất</h4>
						<p className="card-text title-giaidacbiet">iPhone XS Max 64GB</p>
						<div className="bg-giaithuong d-table-cell align-middle">
							<img src={iphone_xs} alt="Iphone" width="322" className="img-fluid" />
						</div>
						<h5 className="card-title">Mã số trúng thưởng</h5>
						<h5 className="card-title" style={{color:'red'}}>Chưa có</h5>
						</div>
					</div>      
				</div>
				<h2 id="bvd" className="d-block btn-ketqua mt-5"><img src={icon_bangvinhdanh} alt="icon" />Bảng vinh danh</h2>
				<div className="table-responsive mt-4">
					<table className="table table-borderless tbl-bvd mx-auto text-center">
						<thead>
						<tr className="text-uppercase title-bvd">
							<th></th>
							<th>Tên</th>
							<th>Giải thưởng</th>
							<th>Thời gian trúng</th>
						</tr>
						</thead>
						<tbody className="top-12">
						<tr>
							<td></td>
							<td>Chưa có</td>
							<td>Xe máy Honda Airblade 2019</td>
							<td>Chưa có</td>
						</tr>
						<tr>
							<td></td>
							<td>Chưa có</td>
							<td>iPhone XS Max 64GB</td>
							<td>Chưa có</td>
						</tr>              
						</tbody>
					</table>
					<table className="table table-bordered tbl-bvd mx-auto text-center">            
						<tbody className="top100">
							{listVinhDanh.map((obj, key) => (
								<tr key={key}>
									<td className="border-right-0">{obj.userName}</td>
									<td className="border-left-0 border-right-0">{obj.itemName}</td>
									<td className="border-left-0">{obj.date}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="pagination justify-content-center pag-custom">
						<Pagination
							activePage={activeVinhDanh}
							itemsCountPerPage={10}
							totalItemsCount={countVinhDanh}
							pageRangeDisplayed={numberPage}
							lastPageText={'Trang cuối'}
							firstPageText={'Trang đầu'}
							itemClass={"page-item"}
							linkClass={"page-link"}
							onChange={(v) => this.handlePageChangeVinhDanh(v)}
						/>
					</div> 
				</div>
				<div className="w-100 justify-content-center text-center pt-5">
					<ul className="nav nav-pills nav-justified">
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://daily.scoin.vn/huong-dan-mua-the/" title="Hướng dẫn mua thẻ scoin" target="_blank">Hướng dẫn mua thẻ scoin</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://www.facebook.com/scoinvtcmobile/" title="Nhận thông báo sk" target="_blank">Nhận thông báo sk</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://scoin.vn/nap-game" title="Nạp scoin" target="_blank">Nạp scoin</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="tel:19001104" title="Hotline hỗ trợ">Hotline hỗ trợ</a>
						</li>
					</ul>
				</div>
			</div>


			<div className="container-fluid footer">
				<p className="text-center"><img src={logo_splay} width="100" alt="" /> <img src={logo_scoin} width="150" hspace="10" alt="" /></p>
				<p className="text-center"><span className="text-uppercase">CÔNG TY CỔ PHẦN VTC DỊCH VỤ DI ĐỘNG</span> <br />VTC Mobile - Thành viên của Tổng Công ty Truyền thông đa phương tiện Viêt Nam VTC <br /> Tầng 11, tòa nhà VTC Online, số 18 Tam Trinh, phường Minh Khai, quận Hai Bà Trưng, Hà Nội.
				<br />(84-4).39877470 <br />84-4).39877210<br /> <a href="mailto:vtcmobile@vtc.vn">vtcmobile@vtc.vn</a>
				</p>
			</div>

			{/* The Modal Phần thưởng */}
			<div className="modal fade" id="myModal">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_phanthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="card-deck">
						<div className="card">
							<div className="card-body text-center" style={{padding:"0rem"}}>
							<h3 className="card-title text-uppercase title-giaidacbiet">Giải đặc biệt</h3>
							<p className="card-text title-giaidacbiet">Xe máy Honda Airblade 2019</p>
							<div className="bg-giaithuong d-table-cell align-middle justify-content-center w-100">
								<img src={honda} alt="Xe máy" className="img-fluid" />
							</div>
							<h5 className="card-title">TRỊ GIÁ: 42.000.000 <br /> Số lượng giải: 01</h5>
							</div>
						</div>
						<div className="card">
							<div className="card-body text-center" style={{padding:"0rem"}}>
							<h3 className="card-title text-uppercase title-giaidacbiet">Giải nhất</h3>
							<p className="card-text title-giaidacbiet">iPhone XS Max 64GB</p>
							<div className="bg-giaithuong d-table-cell align-middle">
								<img src={iphone_xs} alt="Iphone" className="img-fluid" />
							</div>
							<h5 className="card-title">TRỊ GIÁ: 23.000.000 <br /> Số lượng giải: 01</h5>
							</div>
						</div>      
						</div>
						<h3 className="card-title text-uppercase title-giaidacbiet text-center">Các giải khác</h3>
						<div className="card-deck">
						<div className="card">
							<div className="card-body text-center item-giaikhac" style={{padding:"0rem"}}>              
							<div className="bg-giaithuong d-table-cell align-middle h-auto py-4">
								<img src={img_card10k} alt="Thẻ 10k" className="img-fluid mt-2" />
								<p className="text-giaikhac">Tặng thẻ 10.000đ vào Tủ đồ SK <br />Số lượng giải: 1000</p>
							</div>              
							</div>
						</div>          
						<div className="card">
							<div className="card-body text-center item-giaikhac" style={{padding:"0rem"}}>              
							<div className="bg-giaithuong d-table-cell align-middle h-auto py-4">
								<img src={img_card50k} alt="Thẻ 50k" className="img-fluid mt-2" />
								<p className="text-giaikhac">Tặng thẻ 50.000đ vào Tủ đồ SK <br />Số lượng giải: 500</p>
							</div>             
							</div>
						</div>
						<div className="card">
							<div className="card-body text-center item-giaikhac" style={{padding:"0rem"}}>              
							<div className="bg-giaithuong d-table-cell align-middle h-auto py-4">
								<img src={img_card100k} alt="Thẻ 100k" className="img-fluid mt-2" />
								<p className="text-giaikhac">Tặng thẻ 100.000đ vào Tủ đồ SK <br />Số lượng giải: 150</p>
							</div>              
							</div>
						</div>
						<div className="card">
							<div className="card-body text-center item-giaikhac" style={{padding:"0rem"}}>              
							<div className="bg-giaithuong d-table-cell align-middle h-auto py-4">
								<img src={img_card500k} alt="Thẻ 500k" className="img-fluid mt-2" />
								<p className="text-giaikhac">Tặng thẻ 500.000đ vào Tủ đồ SK <br />Số lượng giải: 50</p>
							</div>              
							</div>
						</div>     
						</div>
						
					</div>

					</div>
				</div>
			</div>

			{/* The Modal Thể lệ */}
			<div className="modal fade" id="myModal1">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thele} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<h3 className="text-purple">I. Đối tượng tham gia</h3>
						<p className="text-thele">Khách hàng có tài khoản Scoin. Nếu chưa có, đăng ký <code><a href="https://vtcmobile.vn/oauth/accounts/sso/login/" title="Đăng ký" target="_blank">tại đây</a></code>. <br />
				Xác minh tài khoản Scoin tại đây nếu chưa thực hiện. <br />
				Nạp thẻ Scoin bất kỳ mệnh giá trong thời gian từ 00:01 01/08 - 23:59 07/08/2019.</p>
						<h3 className="text-purple">II. Cách thức tham gia sự kiện</h3>
						<div style={{display:'flex'}}>
							<div className="bg-orange px-0 py-2 text-center" style={{borderRadius: 4, flex:1}}>Đăng nhập Scoin <br />+<br /> Xác thực số điện thoại</div>
							<div className="align-self-center" style={{flexGrowgrow: 0, padding: 0}}><span>></span></div>
							<div className="bg-orange px-0 py-2 text-center" style={{borderRadius: 4, flex:1}}>Nạp ví/Nạp game (Dùng Scoin) <br />+<br /> Nhận lượt chơi</div>
							<div className="align-self-center" style={{flexGrowgrow: 0, padding: 0}}><span>></span></div>
							<div className="bg-orange px-0 py-2 text-center" style={{borderRadius: 4, flex:1}}>Chơi vòng quay <br />+<br /> Nhận mã dự thưởng</div>
							<div className="align-self-center" style={{flexGrowgrow: 0, padding: 0}}><span>></span></div>
							<div className="bg-orange px-0 py-2 text-center" style={{borderRadius: 4, flex:1}}>So mã dự thưởng với KQXS vào lúc 18h30' ngày 08/08/2019</div>
						</div>
						<p className="text-thele pt-3">Bước 1: Đăng nhập tài khoản Scoin <code><a href="https://vtcmobile.vn/oauth/accounts/sso/login/" title="Đăng ký" target="_blank">tại đây</a></code> và thực hiện nạp tiền qua kênh thẻ cào Scoin. <br />
				Bước 2: Nhận lượt quay miễn phí, tương ứng với thẻ Scoin nạp thành công:</p>
						<div className="table-responsive">
							<table className="table table-bordered text-center text-thele">
								<thead>
								<tr>
									<th>STT</th>
									<th>Mệnh giá thẻ Scoin (VNĐ)</th>
									<th>Số lượt quay</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>1</td>
									<td>10.000</td>
									<td>1</td>
								</tr>
								<tr>
									<td>2</td>
									<td>20.000</td>
									<td>2</td>
								</tr>
								<tr>
									<td>3</td>
									<td>50.000</td>
									<td>5</td>
								</tr>
								<tr>
									<td>4</td>
									<td>100.000</td>
									<td>11</td>
								</tr>
								<tr>
									<td>5</td>
									<td>200.000</td>
									<td>22</td>
								</tr>
								<tr>
									<td>6</td>
									<td>300.000</td>
									<td>33</td>
								</tr>
								<tr>
									<td>7</td>
									<td>500.000</td>
									<td>55</td>
								</tr>
								<tr>
									<td>8</td>
									<td>1.000.000</td>
									<td>120</td>
								</tr>
								<tr>
									<td>9</td>
									<td>2.000.000</td>
									<td>240</td>
								</tr>
								<tr>
									<td>10</td>
									<td>5.000.000</td>
									<td>600</td>
								</tr>
								</tbody>
							</table>
						</div>
						<p className="text-thele">Bước 3: Tham gia vòng quay để nhận Mã dự thưởng & thẻ Scoin. <br />
				Bước 4: Mã dự thưởng dùng để đối chiếu với KQ XSMB ngày 08/08/19 để xác định trúng thưởng:</p>
						<div className="table-responsive">
							<table className="table table-bordered w-100 text-center text-thele">
								<thead>
								<tr>
									<th>Giải đặc biệt</th>
									<th>Xe máy Honda Airblade 2019</th>
								</tr>
								<tr>
									<th>Giải nhất</th>
									<th>iPhone XS Max 64GB</th>
								</tr>
								</thead>
							</table>
						</div>
						<h3 className="text-purple">III. Cách thức nhận giải thưởng</h3>
						<p className="text-thele">Đối với phần thưởng là thẻ Scoin: sẽ được lưu trữ trong Tủ đồ sự kiện. Khách hàng có thể
				xem và sử dụng trực tiếp để nạp điện thoại hoặc nạp vào các game của VTC Mobile.
				Đối với phần thưởng là Mã dự thưởng: Sau khi kết quả XSMB ngày 08/08/2019 được
				công bố, BTC sẽ cập nhật thông tin của khách hàng trúng thưởng trong Bảng vinh danh.
				Khách hàng trúng giải liên hệ Hotline 1900 1104 để được hướng dẫn lên nhận thưởng
				trực tiếp tại trụ sở Công ty cổ phần VTC Dịch vụ di động - tầng 11, tòa nhà VTC Online,
				số 18 Tam Trinh, Hai Bà Trưng, Hà Nội.</p>
						<p className="text-thele"><code>Lưu ý:</code> Khi đến nhận giải thưởng, khách hàng cần đem theo giấy tờ tùy thân (CMND/ CCCD/ Hộ chiếu còn hiệu lực.</p>
						<p className="text-thele">Theo khoản 6, điều 3, chương 1 của Luật thuế thu nhập cá nhân, những người may mắn
				trúng giải thưởng hiện vật có giá trị kinh tế cao có nghĩa vụ nộp thuế theo quy định của
				Nhà nước. Thông tin chi tiết xem tại đây.</p>
						<h3 className="text-purple">IV. Thời gian trao thưởng</h3>
						<p className="text-thele">Công ty cổ phần VTC Dịch vụ di động sẽ trao giải thưởng cho khách hàng chậm nhất
				sau 15 ngày làm việc kể từ khi kết thúc sự kiện.</p>
						<p className="text-thele"><code>Lưu ý:</code> Trong tất cả các trường hợp, quyết định của Công ty cổ phần VTC Dịch vụ di động
				là quyết định cuối cùng. Mọi trường hợp gian lận hoặc không trung thực sẽ bị xử lý
				theo pháp luật.</p>
						
					</div>

					</div>
				</div>
			</div>


			{/* The Modal Tủ đồ */}
			<div className="modal fade" id="myModal2">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_tudo} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<table className="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
								<tr className="text-uppercase lead">
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Phần thưởng</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
								</tr>
								</thead>            
								<tbody className="popup-tudo">
									{listTuDo.map((obj, key) => (
										<tr key={key}>
											<td className="border-right-0">{obj.itemName}</td>
											<td className="border-left-0 border-right-0">{obj.description}</td>
											<td className="border-left-0">{obj.date}</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="pagination justify-content-center pag-custom">
								<Pagination
									activePage={activeTuDo}
									itemsCountPerPage={numberItemInpage}
									totalItemsCount={countTuDo}
									pageRangeDisplayed={numberPage}
									lastPageText={'Trang cuối'}
									firstPageText={'Trang đầu'}
									itemClass={"page-item"}
									linkClass={"page-link"}
									onChange={(v) => this.handlePageChangeTuDo(v)}
								/>
							</div> 
						</div>
						
					</div>

					</div>
				</div>
			</div>


			{/* The Modal Mã dự thưởng */}
			<div className="modal fade" id="myModal3">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_maduthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text">Tìm kiếm</span>
								</div>
								<input type="text" class="form-control" placeholder="Nhập mã dự thưởng" onChange={e => this.findCode(e)}/>
							</div>
							<table className="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
								<tr className="text-uppercase lead">
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Mã</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
								</tr>
								</thead>            
								<tbody className="popup-tudo">
								{listCodeBonus.map((obj, key) => (
									<tr key={key}>
										<td className="border-right-0">{obj.description}</td>
										<td className="border-left-0 border-right-0">{obj.itemName}</td>
										<td className="border-left-0">{obj.date}</td>
									</tr>
								))}
								</tbody>
							</table>
							<div className="pagination justify-content-center pag-custom">
								<Pagination
									activePage={activeCodeBonus}
									itemsCountPerPage={numberItemInpage}
									totalItemsCount={countCodeBonus}
									pageRangeDisplayed={numberPage}
									lastPageText={'Trang cuối'}
									firstPageText={'Trang đầu'}
									itemClass={"page-item"}
									linkClass={"page-link"}
									onChange={(v) => this.handlePageChangeCodeBonus(v)}
								/>
							</div> 
							<p className="text-thele">Lưu ý: Tài khoản Scoin của quý khách cần phải xác thực số ĐT để nhận thông báo trong trường hợp trúng giải. <code><a style={{fontSize:18}} href=" https://scoin.vn/doi-sdt" title="Xác thực ngay" target="_blank">Xác thực ngay</a></code> </p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			{/* The Modal Thông báo chúc mừng */}
			<div className="modal" id="myModal4">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

					{/* <!-- Modal body --> */}
						<div className="modal-body bg-chucmung justify-content-center">
							<div className="card">
								<div className="card-body content-chucmung mx-auto">
									{(code)?(
									<div>
										<div className="text-chucmung text-center" style={{marginTop:70}}>
											<span className="text-white">Bạn vừa quay vào ô</span>
											<span className="pt-1 d-block">Mã số dự thưởng Xe máy Honda Air Blade và Điện thoại iPhone XS Max đã được lưu trong Mã dự thưởng.</span>
										</div>
									
										<p className="small pt-2 mb-2 text-center">So Mã số dự thưởng với KQ XSMB vào lúc xx giờ ngày 08/08/2019.<br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalCodeBonus}>Xem phần thưởng</label></p>
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
									</div>
									):(
									<div><div className="text-chucmung text-center" style={{marginTop:70}}>
											<span className="text-white">Bạn vừa quay vào ô</span>
											<span className="pt-1 d-block"><img src={itemBonus.urlImage} alt="" /></span>
										</div>
										<p className="small pt-2 mb-2 text-center">(Phần thưởng đã được chuyển vào tủ đồ sự kiện) <br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalTuDo}>Xem phần thưởng</label></p>
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
										</div>
									)}	
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div class="modal fade" id="myModal5">
				<div class="modal-dialog">
					<div class="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div class="modal-header border-bottom-0">
						<h4 class="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" class="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body">
						<div class="table-responsive mt-2">              
							<h5 class="text-thele lead text-center">Xin vui lòng đăng nhập!</h5>
							<button type="button" class="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.loginAction}>Đăng nhập</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div class="modal fade" id="myModal6">
				<div class="modal-dialog">
					<div class="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div class="modal-header border-bottom-0">
						<h4 class="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" class="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body">
						<div class="table-responsive mt-2">              
							<h5 class="text-thele lead text-center">Bạn đã hết lượt quay!</h5>
							<p class="text-thele lead text-center">Hãy nạp Scoin để nhận thêm lượt chơi Vòng quay tháng 8.</p>
							<button type="button" class="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}>Nạp Scoin</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			<div class="modal fade" id="myModal8">
				<div class="modal-dialog">
					<div class="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div class="modal-header border-bottom-0">
						<h4 class="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" class="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body">
						<div class="table-responsive mt-2">              
							<h5 class="text-thele lead text-center">{message_status}</h5>
						</div>       
					</div>

					</div>
				</div>
			</div>

		</div>)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	dataTuDo: state.lucky.dataTuDo,
	dataVinhDanh: state.lucky.dataVinhDanh,
	dataCodeBonus: state.lucky.dataCodeBonus,
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
	getTuDo,
	getCodeBonus,
	getVinhDanh,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Lucky_Rotation))