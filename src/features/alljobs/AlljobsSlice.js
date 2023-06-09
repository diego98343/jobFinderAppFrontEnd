import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify'
import customFetch from '../../utils/axios';


const initialFilterState ={
    search:'',
    searchStatus:'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions:['latest','oldest','a-z','z-a']
}

const initialState ={
    isLoading: false,
    jobs: [],
    totalJobs:0,
    numOfPages:1,
    page:1,
    stats:{},
    monthlyApplication: [],
    ...initialFilterState
}



export const getAllJobs = createAsyncThunk('allJobs/getJobs',async(_,thunkAPI)=>{

   const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;

   let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

    if(search){
      url = url + `&search=${search}`;
    }

    try{
       const resp = await customFetch.get(url,{
        headers:{
            Authorization:`Bearer ${thunkAPI.getState().user.user.token}`
        }
       });
       console.log(resp.data);
       return resp.data
    }catch(error){
       return thunkAPI.rejectWithValue('there was an error')
    }
})



const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers:{
         showLoading:(state)=>{
            state.isLoading = true
         },
         hideLoading:(state)=>{
            state.isLoading = false
         },
         //we use this to handle the changes 
         handleChange:(state,{payload:{name,value}})=>{
            //every time we make a change (new request) we set the page equal to 1
            state.page = 1 
            state[name]=value;
         },
         clearFilters:(state)=>{
            return {...state,...initialFilterState}
         },
         changePage:(state,{payload})=>{
           state.page = payload
         }
    },
    extraReducers:{
        [getAllJobs.pending]:(state)=>{
           state.isLoading = true
        },
        [getAllJobs.fulfilled]:(state,{payload})=>{
            //payload is what the getAllJob function returns
            console.log()
            state.isLoading = false;
            state.jobs = payload.jobs;
            state.numOfPages = payload.numOfPages;
            state.totalJobs = payload.totalJobs

         },
         [getAllJobs.rejected]:(state,{payload})=>{
            state.isLoading = false
            toast.error(payload)
         },
    }
    
})

export const { showLoading,
               hideLoading,
               handleChange,
               clearFilters,
               changePage,
                            
            }= allJobsSlice.actions

export default allJobsSlice.reducer;