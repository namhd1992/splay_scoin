import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const LUCKY_REQUEST = 'lucky/LUCKY_REQUEST'
export const LUCKY_RESPONSE = 'lucky/LUCKY_RESPONSE'
export const LUCKY_ROTATION_DETAIL_RESPONSE = 'lucky/LUCKY_ROTATION_DETAIL_RESPONSE'
export const LUCKY_ROTATION_DETAIL_RESPONSE_USER = 'lucky/LUCKY_ROTATION_DETAIL_RESPONSE_USER'
export const LUCKY_DETAIL_RESPONSE = 'lucky/LUCKY_DETAIL_RESPONSE'
export const LUCKY_RESPONSE_MORE = 'lucky/LUCKY_RESPONSE_MORE'
export const LUCKY_PICK_RESPONSE = 'lucky/LUCKY_PICK_RESPONSE'
export const LUCKY_TURN_RESPONSE = 'lucky/LUCKY_TURN_RESPONSE'
export const LUCKY_HISTORY_RESPONSE='lucky/LUCKY_HISTORY_RESPONSE'

const initialState = {
	data: [], 
	waiting: false
}

export default (state = initialState, action) => { 
	switch (action.type) {
		case LUCKY_REQUEST:
			return {
				...state,
				waiting: true
			}
		case LUCKY_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case LUCKY_RESPONSE_MORE:
			return {
				...state,
				data: state.data.concat(action.data),
				totalRecords: action.totalRecords,
				waiting: false
			}
		case LUCKY_DETAIL_RESPONSE:
			return {
				...state,
				dataDetail: action.data,
				waiting: false
			}
		case LUCKY_PICK_RESPONSE:
			return {
				...state,
				dataPick: action.data,
				waiting: false
			}
		case LUCKY_TURN_RESPONSE:
			return {
				...state,
				dataTurn: action.data,
				waiting: false
			}
		case LUCKY_HISTORY_RESPONSE:
			return {
				...state,
				dataHistory: action.data,
				waiting: false
			}
		case LUCKY_ROTATION_DETAIL_RESPONSE:
			return {
				...state,
				dataRotation: action.data,
				waiting: false
			}
		case LUCKY_ROTATION_DETAIL_RESPONSE_USER:
			return {
				...state,
				dataRotationWithUser: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (limit, offset) => {
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "lucky-spin/get?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: LUCKY_RESPONSE,
				data: response.data.data,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getMoreData = (limit, offset) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "lucky-spin/get?limit=" + limit + "&offset=" + offset;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_RESPONSE_MORE,
				data: response.data.data,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getDetailData = (id) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			// "Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "lucky-spin/detail?lucky_spin_id=" + id;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_DETAIL_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}



export const pickCard = (token, id) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		// var url = Ultilities.base_url() + "/awardSpin?spinId=" + id + "&scoinToken=" + scoinToken;
		var url = Ultilities.base_url() + "lucky-spin/award-spin?lucky_spin_id=" + id;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_PICK_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const buyTurn = (id, turn, spin_name) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			// "Authorization": "bearer " + token,
		}
	}
	var body = {
		spin_id: +id,
		number_turn: turn,
		spin_name:spin_name,
		// scoinToken: scoinToken
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "lucky-spin/buy-turn";
		return axios.post(url, body, header).then(function (response) {
			console.log(response.data)
			dispatch({
				type: LUCKY_TURN_RESPONSE,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const history = (id, type) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			// "Authorization": "bearer " + token,
		}
	}

	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "lucky-spin-history?lucky_spin_id="+id+'&type_gift='+type;
		return axios.get(url, header).then(function (response) {
			console.log(response.data)
			dispatch({
				type: LUCKY_HISTORY_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}


export const getRotationDetailData = (id) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			// "Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "anonymous/lucky-spin/detail?lucky_spin_id=" + id;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_ROTATION_DETAIL_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getRotationDetailDataUser = (token, id) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: LUCKY_REQUEST
		})
		var url = Ultilities.base_url() + "lucky-spin/detail?lucky_spin_id=" + id;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: LUCKY_DETAIL_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}