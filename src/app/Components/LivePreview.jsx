import React, { useState ,memo} from 'react';
import Global from './Global';

const LivePreview = ({update}) => {
  return (
    <div className='flex flex-col  my-4 justify-center items-center w-full overflow-hidden'>
        <div className='font-semibold text-xl my-1 mb-3'>What your 
        <div className='relative inline-block text-xl mx-1'>
        <span className='bg-gradient-to-tr from-blue-400 to-purple-500 bg-clip-text text-transparent '>nest</span> 
            <div className='absolute h-0.5 w-full bottom-0 left-0 bg-gradient-to-tr from-blue-500 to-purple-600'></div>
          </div>
         looks like!</div>
      <div className="w-[320px] h-[590px] border-2 border-gray-800 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto">
          <Global update={update}/>
        </div>
      </div>
    </div>
  );
};

export default memo(LivePreview);