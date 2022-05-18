const API_END_POINT = '3.34.55.178:5000/predict';

export const request = async (url = "", options = {}) => {
    try{
        const res = await fetch(`${API_END_POINT}${url}`, options);

        // 에러 처리 할 것!!
        // if (!res.ok) {
        //     throw new Error('서버의 상태가 이상합니다.');
        // }

        return await res.json();
    }catch (e) {
        throw new Error(e);
    }
}