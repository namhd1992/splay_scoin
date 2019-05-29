import React from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import {
	withMobileDialog,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import Notification from '../../components/Notification';
import LoginRequired from '../../components/LoginRequired';
import '../../styles/imageServerError.css';
import '../../styles/luckyBuyTurn.css';



class LuckyBuyTurnComponent extends React.Component {

	constructor(){
		super();
		this.state = {
			intValue:0,
			whenSelect:"",
			btnPlay: false,
		};
	}
	
	showBuyTurn=()=>{
		this.setState({intValue:1,whenSelect:"1px solid #00ccd4"})
		this.props.showBuyTurn();
	}
	backLucky=()=>{
		this.props.backLucky();
	}

	selectPackage(value){
		this.setState({intValue:value, whenSelect:"1px solid #00ccd4"});
	}
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	convettoLocaleString(value){
		return value.toLocaleString();
	}

	render() {
		const {message,openSnack,snackVariant, dataDetail, server,waiting, dialogLoginOpen}=this.props;
		const items=[{number:1, price:10}, {number:5, price:50}, {number:10, price:100}, {number:20, price:200}, {number:50, price:500}, {number:100, price:1000}]

		return (dataDetail!==undefined) ? (<div style={{ marginTop: "8px" }}>
						<div style={{width:"100%"}}>
							<div className="infoTitle">
								<div className="valueUserBuyTurn">
									<span className="global-thit" style={{color:"black"}}>Còn <span style={{marginLeft:'50px'}}><img alt="just alt"src="../thit.png" /> <span style={{ color: "black" }} >{this.convettoLocaleString(dataDetail.userSpinInfo.rewardPoint) + " Thịt"}</span></span><span style={{float:'right'}}> {dataDetail.userSpinInfo.turnsBuy + dataDetail.userSpinInfo.turnsFree} lượt quay</span></span>
								</div>	
							</div>
							<Grid item xs={12} style={{margin:15}}>
									<div style={{marginBottom:20}}>
										<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_add_inactive.png" alt="icon"/></div><span style={{float:'left'}}>Mua thêm lượt</span>
									</div>
							</Grid>
							<div className="optionLeftBuyTurn">
								{items.map((obj, key) => (
									<div key={key} style={{background:"#fff", borderRadius:"10px", height:"60px", marginBottom:"15px", cursor:"pointer", border:(this.state.intValue === obj.number)?this.state.whenSelect:""}} onClick={()=>this.selectPackage(obj.number)}>
										<div style={{color:"#33cbcc", padding:"5px 10px", lineHeight:"60px"}}><span>+ {this.convettoLocaleString(obj.number)} lượt</span><span className="global-thit" style={{float:'right'}}><img alt="just alt" src="../scoin.png" /> <span style={{color:'black'}}>{this.convettoLocaleString(obj.price)}</span></span></div>
									</div>
								))}
							</div>
						</div>
						<div className="actionBuyTurn">
							<button className="buyTurn" onClick={() => this.buyTurn()}>
								MUA
							</button>
							<div item xs={12} className="btn_back" onClick={this.backLucky}>
								<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_back.png" alt="icon"/></div><span style={{float:'left', color:'#33cccc'}}>Quay Lại</span>
							</div>
						</div>

						<Grid item xs={12}>
							<div style={{textAlign:'center', marginTop:40, marginBottom:25, fontSize:14}}>
								<div><span>Hệ thống phát hành game VTC Mobile</span></div>
								<div><span>Copyright 2017 VTC Mobile. All rights reverved</span></div>
								<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
							</div>
						</Grid>
						<LoginRequired open={dialogLoginOpen}></LoginRequired>
				<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</div>): (<div className="global-loading">
			{(waiting === true) ? (												
				<CircularProgress style={{ color: "black" }} size={50} />):((server===true)?(<img className="error" alt="just alt"
				src="../baotri.png" />):(<div style={{color:"black", fontSize:"20px"}}>Không có dữ liệu!</div>))}
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

LuckyBuyTurnComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(LuckyBuyTurnComponent))
