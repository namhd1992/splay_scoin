import React from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ReactCardFlip from 'react-card-flip';
import ReactResizeDetector from 'react-resize-detector';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Notification from '../../components/Notification';
import LoginRequired from '../../components/LoginRequired';
import '../../styles/imageServerError.css';
import '../../styles/luckyDetail.css';

const styles = {
	paper: {
		background: "#2b323d"
	},
	buttonOrange:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#ff5f27,#ff9019)",
		color: "#fff",
		padding: "10px", height:"35px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto"
	},
	buttonGreen:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#22cab5,#3fe28f)",
		color: "#fff",
		padding: "10px", height:"40px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto"
	}
};



class LuckyDetailComponent extends React.Component {

	constructor(){
		super();
		this.state = {
			intValue:0,
			whenSelect:"",
			btnPlay: false,
			div1:'back',
			div2:'front',
			guide1:'- Nhấn "CHƠI" để bắt đầu.',
			guide2:'- Sau đó các thẻ phần thưởng sẽ được úp xuống.'
		};
	}
	showItem=()=>{
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckyitembonus`,
		);
	}
	
	showBuyTurn=()=>{
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckybuyturn`,
		);
	}
	
	handleCloseDialogItem=()=>{
		this.props.handleCloseDialogItem();
	}
	
	handleCloseDialogLogin=()=>{
		this.props.handleCloseDialogLogin();
	}
	
	handleCloseMoreTurnDialog=()=>{
		this.props.handleCloseMoreTurnDialog();
	}
	
	handleCloseDialog=()=>{
		this.props.handleCloseDialog();
	}
	
	
	pick=(key)=>{
		var _this = this;
		setTimeout(function () {
			_this.showBtnPlay();
		}, 1500);
		this.props.pick(key);
	}
	showBtnPlay=()=>{
		this.setState({btnPlay: false, guide1:'- Phần thưởng sẽ được cộng vào tài khoản hoặc lưu trong Hộp thư.', guide2:'- Nhấn "CHƠI" để bắt đầu tiếp.'})
	}
	
	start=()=>{
		if(this.props.dataDetail.userSpinInfo.turnsBuy + this.props.dataDetail.userSpinInfo.turnsFree >0){
			this.setState({btnPlay: true,div1:'front', div2:'back', guide1:'- Mời bạn lật thẻ để nhận phần thưởng.', guide2:''})
		}
		this.props.start();
	}
	
	expand=()=>{
		this.props.expand();
	}

	flipCard=(key)=>{
		this.props.flipCard(key);
	}
	
	swap=(id1, id2)=>{
		this.props.swap(id1, id2);
	}
	
	unHighLight=()=>{
		this.props.unHighLight();
	}
	
	highLight=(card_id)=>{
		this.props.highLight(card_id);
	}
	
	random=()=>{
		this.props.random();
	}
	openCard=(id)=>{
		this.props.openCard(id);
	}
	onResize=()=>{
		this.props.onResize();
	}
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	selectPackage(value){
		this.setState({intValue:value, whenSelect:"1px solid #00ccd4"});
	}

	convettoLocaleString(value){
		return value.toLocaleString();
	}

	render() {
		const {dataDetail, dataProfile,message,cardWidth,cardHeight,flippedArr,collapse,cardArr,
			highLightCard,openSnack,snackVariant,dialogLoginOpen,dialogItemOpen,fontSize,dialogMoreTurnOpen,server,waiting, numberWidth,
			numberHeight}=this.props;		
		const { classes } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		var splayPoint=dataProfile.splayPoint;
		if(splayPoint !== undefined){
			splayPoint=this.convettoLocaleString(splayPoint);
		}
		return (cardArr.length > 0) ? (
			<div className="lucky-detail-root" style={{ marginTop: "8px" }}>
				<Grid container spacing={12}>
					<Grid item xs={12} md={12}>
						<Grid container className="lucky-detail-root" spacing={8}>
							<Grid item xs={12} sm={12}>
								<div className="lucky-wrap"
									style={{ margin: "auto", width: (cardWidth * numberWidth) + "px", height: (cardHeight * numberHeight) + "px", position: "relative" }}>
									{cardArr.map((obj, key) => {
										var top = "0px";
										var left = "0px";
										if (!collapse) {
											left = (key % numberWidth) * cardWidth + "px";
											top = (Math.floor(key / numberWidth)) * cardHeight + "px"
										}
										return (<div key={key} className="lucky-card lucky-card-collapse"
											style={{
												transition: "0.5s",
												WebkitTransition: "0.5s",
												padding:"5px",
												width: cardWidth,
												height: cardHeight + "px",
												left: left,
												top: top
											}}>
											<ReactCardFlip style={{ height: '100%' }} isFlipped={flippedArr.find(x => x.id === obj.item.id).status}>
												<div key={this.state.div1} style={{
													opacity: (highLightCard === null || highLightCard === obj.item.id) ? "1" : "0.5",
													backgroundSize: "contain",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center",
													backgroundImage: "url(../cardfront1.png)",
													width: "100%",
													height: cardHeight + "px",
													textAlign: "center"
												}}>
													<div style={{ paddingTop: cardHeight * 0.3 + "px" }}><img alt="just alt" style={{ width: (cardWidth * 0.5) + "px" }}
														src={obj.item.urlImage} /></div>
													<div style={{ fontSize: fontSize }}>{obj.item.name}</div>
												</div>
												<div key={this.state.div2} onClick={() => this.pick(obj.item.id)} style={{
													backgroundSize: "contain",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center",
													backgroundImage: "url(../cardback1.png)",
													width: "100%",
													height: cardHeight + "px",
													textAlign: "center",
													cursor:'pointer'
													
												}}>
												</div>
											</ReactCardFlip>
										</div>)
									}
									)}
								</div>
							
							
							</Grid>
							<Grid style={{padding:"8px"}} container spacing={8} sm={12}>
								<Grid container>
									<div className="tutorial">
										<p style={{color:'#black', textAlign:'left', paddingTop:'10px'}}>{this.state.guide1}</p>
										<p style={{color:'#black', textAlign:'left', paddingBottom:'15px'}}>{this.state.guide2}</p>
									</div>
								</Grid>
								<Grid container></Grid>
								<Grid container></Grid>
								<Grid container></Grid>
								<Grid container></Grid>
								<Grid container></Grid>
								<Grid container></Grid>
								<Grid container></Grid>
								<Grid container></Grid>
								<Grid container spacing={8}>
									<div className="actionPlay">
										<Grid item xs={12} style={{paddingBottom:"5px"}}>
											{(this.state.btnPlay)?(<button className="buttonGreen">LẬT BẤT KỲ</button>):(
												<button className="buttonGreen" onClick={this.start}>CHƠI ({dataDetail.userSpinInfo.turnsBuy + dataDetail.userSpinInfo.turnsFree})</button>
											)}
											
										</Grid>
										<div item xs={12} className="btn_bonus_latthe" onClick={this.showItem}>
											<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_bonus_active.png" alt="icon"/></div><span style={{float:'left', color:'#33cccc'}}>Phần Thưởng</span>
										</div>
										<div item xs={12} className="btn_buy_latthe" onClick={this.showBuyTurn}>
											<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_add.png" alt="icon"/></div><span style={{float:'left', color:'#33cccc'}}>Mua Lượt</span>
										</div>
										{/* <Grid item xs={12} style={{paddingBottom:"5px"}}>
											<button className="buttonOrange" onClick={this.showItem}>PHẦN THƯỞNG</button>
										</Grid>
										<Grid item xs={12} style={{paddingBottom:"5px"}}>
											<button className="buttonOrange" onClick={this.showBuyTurn}>MUA LƯỢT</button>
										</Grid> */}
									</div>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
								<div style={{textAlign:'center', marginTop:40, marginBottom:25, fontSize:14}}>
									<div><span>Hệ thống phát hành game VTC Mobile</span></div>
									<div><span>Copyright 2017 VTC Mobile. All rights reverved</span></div>
									<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
								</div>
							</Grid>
					</Grid>
				</Grid>

				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />
				<Dialog
					fullScreen={false}
					open={dialogMoreTurnOpen}
					onClose={this.handleCloseMoreTurnDialog}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }} >Bạn đã hết lượt quay</span></DialogTitle>
					<DialogContent>
						<div style={{ color: "#fff" }}>
							Mua thêm lượt quay để tiếp tục
						</div>
					</DialogContent>
					<DialogActions>
						<div>
							<Button className={classes.buttonOrange} onClick={this.showBuyTurn}>Mua lượt</Button>
							<Button onClick={this.handleCloseMoreTurnDialog} style={{ color: "#888787", borderRadius:"20px", marginRight:"15px" }}>Đóng</Button>
						</div>
					</DialogActions>
				</Dialog>
				
				<LoginRequired open={dialogLoginOpen}></LoginRequired>
				<Dialog
					open={dialogItemOpen}
					onClose={this.handleCloseDialogItem}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }} >Phần thưởng</span></DialogTitle>
					<DialogContent>
						<List className="lucky-detail-root">
							{dataDetail.itemOfSpin.map((obj, key) => (
								<ListItem key={key} style={{ minWidth: "120px" }}>
									<div>
										<img alt="just alt" className="lucky-item-img" src={obj.item.urlImage} />
									</div>
									<ListItemText primary={obj.item.name} />
								</ListItem>
							))}
						</List>
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleCloseDialogItem} style={{ color: "#888787", borderRadius:"20px" }}>Đóng</Button>
						</div>
					</DialogActions>
				</Dialog>
				<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</div>
		) : (<div className="global-loading">
			{(waiting === true) ? (												
				<CircularProgress style={{ color: "black" }} size={50} />):((server===true)?(<img className="error" alt="just alt"
				src="../baotri.png" />):(<div style={{color:"black", fontSize:"20px"}}>Không có dữ liệu!</div>))}
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

LuckyDetailComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(LuckyDetailComponent)))
