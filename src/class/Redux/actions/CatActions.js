import CatService from '../../DataHelper/Services/CatService';
import CatOTS from '../../DataHelper/ObjectToStore/CatOTS';


export const getCats = () => async (dispatch) => {
    const cats = await CatService.getCats();
    CatOTS.toDispatch(CatOTS.fetchCats, cats)(dispatch);
}