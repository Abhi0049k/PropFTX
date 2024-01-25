import { atom } from "recoil";

export const tokenAtom = atom({
    key: 'token',
    default: ''
})

export const loadingAtom = atom({
    key: 'loading',
    default: false
})

export const changingAtom = atom({
    key: 'changing',
    default: false
})
