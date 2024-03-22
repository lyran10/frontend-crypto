import { useDispatch ,useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import { RootState,AppDispatch } from '../component/redux/store';

export const useRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector: TypedUseSelectorHook<RootState> = useSelector;

  const methods = {
    dispatch,
    selector
  }
  return [methods]
}
