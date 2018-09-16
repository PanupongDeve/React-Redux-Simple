import CatService from '../../class/DataHelper/Services/CatService';
import CatOTS from '../../class/DataHelper/ObjectToStore/CatOTS';


export const getCats = () => async (dispatch) => {
    const cats = await CatService.getCats();
    CatOTS.toDispatch(CatOTS.fetchCats, cats)(dispatch);
}