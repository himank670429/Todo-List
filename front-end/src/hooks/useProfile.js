import useAppData from './useAppData';
export default  function useProfile() {
    return useAppData().data.username;
}
