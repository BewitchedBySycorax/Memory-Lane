import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getAlbums } from '../../../actions/actionAlbums';
import './UserAlbums.sass';
import { Link } from  'react-router-dom';
import {ReactComponent as DownloadIcon} from '../svg/downloadIcon.svg';
import {ReactComponent as ShareIcon} from '../svg/shareIcon.svg';
import {ReactComponent as RenameIcon} from '../svg/reNameIcon.svg';
import {ReactComponent as CopyIcon} from '../svg/copyIcon.svg';
import {ReactComponent as DeleteIcon} from '../svg/deleteIcon.svg';
import {ReactComponent as Dots} from '../svg/dots.svg';
import Sorting from '../General/Sorting/Sorting';

class UserAlbums extends Component {
  constructor(props) {
    super(props);
    this.setGridType = this.setGridType.bind(this);
    this.showActions = this.showActions.bind(this);
    this.closeActions = this.closeActions.bind(this);

    this.state = {
      albumName: '',
      description: '',
      styleType: 'userAlbumsWrapBig',
      showActions: ''
    };
  }
  showActions(event, id) {
    event.preventDefault();
    this.setState({ showActions: id }, () => {
      document.addEventListener('click', this.closeActions);
    });
  }
  closeActions() {
    this.setState({ showActions: '' }, () => {
      document.removeEventListener('click', this.closeActions);
    });
  }
	handleInput = e => {
	  const { name, value } = e.target;
	  this.setState({ [name]: value });
	}

	setGridType(gridId) {
	  switch (gridId) {
	    case 1:
	      this.setState({styleType: 'userAlbumsWrapBig'});
	      this.setState({rowItemView: false});
	      break;
	    case 2:
	      this.setState({styleType: 'userAlbumsWrapMiddle'});
	      this.setState({rowItemView: false});
	      break;
	    case 3:
	      this.setState({styleType: 'userAlbumsWrapSmall'});
	      this.setState({rowItemView: true});
	      break;
	    default:
	      return;
	  }
	}
  
	render() {
	  const { loading, albums } = this.props;
	  const userAlbums = albums ?? [];
		

	  const albumsItems = userAlbums.map((album, index) =>
	    (
	        <div key={album.id}>
	        <Link className='userAlbumsLink' to={`/albums/${index}`}>
	          <div className='imgWrap'>	      
	            <img className='imgWrap__img' src='https://picsum.photos/238/149' alt='albumPreview'/>
	          </div>
	        </Link>
	          <div className='albumName'>
	            <span className='albumName-span'>{album.album_name}</span>
	            <div className='actionsForAlbums'>
	            <Dots className={'dots-list'} onClick={e => {this.showActions(e, album.id);}}/>
	              {
	                this.state.showActions === album.id
	                  ? 
	                  (<ul className='actionsForAlbums__dropdown'>
	
	                    <li className='actionsForAlbums__li'>
	                      <ShareIcon/> Поделиться
	                    </li>
	                    <li className='actionsForAlbums__li'>
	                      <DownloadIcon/>Скачать

	                    </li>
	                    <li className='actionsForAlbums__li'>
	                      <RenameIcon/>Переименовать

	                    </li>
	                    <li className='actionsForAlbums__li'>
	                      <CopyIcon/>Копировать
	                    </li>
	                    <li className='actionsForAlbums__li'>
	                      <DeleteIcon/>Удалить

	                    </li>
							  </ul>)
	                  :
	                  null
	              }
	            </div>
	          </div>
	        </div>
	    )
	  );

	  return (
	    loading ? <h1>Загрузка данных</h1> :
	      <div className='contentContainer'>
	        <Sorting
	          currentPage='allAlbums'
	          setGridType={this.setGridType}
	        />
	        <div className={this.state.styleType}>
	          {albumsItems}
	        </div>
	      </div>
	  );
	}
}

const mapStateToProps = (state) => {
  return {
    loading: state.albums.loading,
    albums: state.albums.albums
  };
};

const mapDispatchToProps = dispatch => {
  return {
    downloadAlbums: () => {
      dispatch(getAlbums());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAlbums);


