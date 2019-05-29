import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
import IconButton from 'material-ui/IconButton'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles'
import '../../styles/imageServerError.css'


const styles = theme => ({
	root: {
		marginTop: "8px",
		margin: "auto"
	},
	gridItem: {
		borderRadius: "5px",
		backgroundColor: "#fff",
		overflow: "hidden"
	}
});

class LuckyComponent extends React.Component {

	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}

	setIdLucky=(id)=>{
		localStorage.setItem("idLucky", id);
		return id;
	}

	render() {
		const {data, waiting, totalRecords, loadedRecords, server}=this.props;
		const { classes } = this.props;
		return (<div className={classes.root}>
			<Grid container spacing={12}>
				<Grid item xs={12} md={12}>
					<Grid container spacing={12}>
						{data.map((obj, key) => {
							var now = moment(new Date()); //todays date
							var end = moment(new Date(obj.endDate)); // another date
							var duration = moment.duration(end.diff(now));
							var days = Math.floor(duration.asDays());
							var hours = Math.floor(duration.asHours());
							var minutes = Math.floor(duration.asMinutes());
							var time_text = "";
							if (days > 0) {
								time_text = "Còn " + days + " ngày";
							} else if (hours > 0) {
								time_text = "Còn " + hours + " giờ";
							} else if (minutes > 0) {
								time_text = "Còn " + minutes + " phút";
							}
							return (
								<Grid key={key} item xs={12} md={12}>
									<div className={classes.gridItem}>
										<Link to={"/luckydetail/" + this.setIdLucky(obj.id)}>
											<GridListTile style={{ listStyleType: "none", backgroundColor: "#fff" }}>
												<div style={{
													backgroundImage: "url(" + obj.image + ")",
													backgroundSize: "cover",
													width: "100%",
													paddingBottom: "30%",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center"
												}} />
												<GridListTileBar
													style={{backgroundColor:'#2b7f7d'}}
													title={time_text}
													actionIcon={
														<IconButton>
														</IconButton>
													}
												/>
											</GridListTile>
										</Link>
									</div>
								</Grid>
							)
						}
						)}
						{(waiting) ? (<Grid item xs={12}>
							<div className="global-loading">
							{(server !== true) ? (												
								<CircularProgress style={{ color: "black" }} size={50} />):(<img className="error" alt="just alt"
								src="../baotri.png" />)}
							</div>
						</Grid>) : (totalRecords < loadedRecords) ? (
								<div item xs={12} className="div_more_lucky" onClick={this.loadMoreAction}>
									<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_add.png" alt="icon"/></div><span style={{float:'left'}}>Xem Thêm</span>
								</div>
						) : (<div></div>)}
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
		</div>)
	}
}

export default connect()(withStyles(styles)(withTheme()(LuckyComponent)))
