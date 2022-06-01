import { useAppContext } from '../context/appContext'

const Trophy = () => {
  const { trophyType, trophyText } = useAppContext()
  return (
    <div className='toast'>
      <div className='toast-content'>
        <div className='message'>
          <span className='text text-1'>{trophyType}</span>
          <span className='text text-2'>{trophyText}</span>
        </div>
      </div>
    </div>
  );
};
export default Trophy;
