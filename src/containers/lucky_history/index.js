import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	getDetailData,
} from '../../modules/lucky'

import HistoryBonusComponent from '../../components/page/HistoryBonus'

class Lucky_History extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,

		};
	}

	componentDidMount() {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var idLucky= localStorage.getItem("idLucky");
		// if (user !== null) {
		// 	this.props.getDetailData(user.access_token, idLucky);
		// } else {
		// 	_this.setState({ dialogLoginOpen: true });
		// }
		this.props.getDetailData(idLucky);
	}

	backLucky=()=>{
		var idLucky= localStorage.getItem("idLucky");
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckydetail/`+idLucky,
		);
	}

	render() {
		
		return (
			<div>
				<HistoryBonusComponent
					notSelectOption={this.notSelectOption}
					handleCloseDialogLogin={this.handleCloseDialogLogin}
					dataDetail={this.props.dataDetail}
					backLucky={this.backLucky}
					server={this.props.server}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}

				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_History)