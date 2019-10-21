import {
    GET_MANAGERINFO,
    RECORD_MANAGERINFO,
} from './mutation-types'

import { setStore, getStore } from '../utils/storage'

export default {
    // 记录管理员信息
    [RECORD_MANAGERINFO](state, info) {
        state.managerInfo = info
        state.login = true
        setStore('userInfo', info)
    },

    // 获取管理员信息
    [GET_MANAGERINFO](state, info) {
        if (state.managerInfo && (state.managerInfo.username !== info.username)) {
            return
        }
        if (!state.login) {
            return
        }
        if (!info.message) {
            state.managerInfo = {...info}
        } else {
            state.userInfo = null
        }
    }

}