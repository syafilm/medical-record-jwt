import React from 'react'
import moment from 'moment'
import styled from '@emotion/styled'
import { ApiSearchs } from 'api'
import { useDebounce } from 'use-debounce'
import { Validation } from 'utils'
import {useLocation, Link} from 'react-router-dom'

const Wrapper = styled.div`
  border-bottom: 1px solid #d7e1e7;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`

const InputGroup = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  > span{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
    padding-left: 10px;
    background: #ECF1F4;
    border-top-left-radius: 5px;
    border-bottom-left-radius: ${props => props.active ? `0px` : `5px`};
    height: 38px;
    border: 1px solid #d7e1e7;
    border-right: 0px;
  }
  > div{
    margin-bottom: 0px;
  }
  .input-search{
    border-left: 0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: ${props => props.active ? `0px` : `5px`};
  }
`

const LeftHeader = styled.div`
  margin-right: auto;
`

const RightHeader = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  > span{
    margin-right: 10px;
  }
  > ul{
    display: flex;
    list-style: none;
    margin: 0px;
    padding: 0px;
    > li{
      display: inline-flex;
      margin-left: 10px;
      align-items: center;
      > a{
        &.active{
          font-family: 'OpenSans Bold';
          color: #4b988b;
        }
        align-items: center;
        display: inline-flex;
        > img{
          width: 35px;
          height: 35px;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
          margin-left: 0px;
        }
        > i{
          background: #ECF1F4;
          width: 35px;
          height: 35px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          font-size: 20px;
        }
      }
    }
  }
`

const Input = styled.input`
  border: 1px solid #d7e1e7;
  border-radius: 5px;
  min-height: 38px;
  display: inline-flex;
  min-width: 250px;
  background: #ECF1F4;
  padding: 0px 10px;
  &:focus{
    outline: 0;
  }
`

const Search = styled.div`
  position: absolute;
  width: calc(100% - 2px);
  max-height: 350px;
  top: 39px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d7e1e7;
  border-top: 0px;
  background: #ECF1F4;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-top: 0px;
  z-index: 2;
`

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  background: #fff;
  padding: 8px;
  width: auto;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #d7e1e7;
  margin-top: ${props => props.first ? `20px` : `0px`};
  > img{
    width: 70px;
    height: 70px;
    object-fit: cover;
    objec-position: center;
    border-radius: 5px;
    margin-right: 10px;
  }
  > div{
    > b{
      display:block;
      font-size: 14px;
    }
    > span{
      color: rgba(0,0,0, 0.6);
      font-size: 14px;
      display: block;
    }
    > p{
      margin: 0px;
      font-size: 12px;
      padding: 1px 12px;
      background: #e9eef1;
      border-radius: 3px;
      display: inline-block;
      color: rgba(0,0,0, 0.6);
      margin-top: 6px;
    }
  }
`

const Header = ({avatar, role, email}) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const search = query.get('search') === null ? '' : query.get('search');
  const [keyword, setKeyword] = React.useState(search);
  const [newKeyword] = useDebounce(keyword, 2000);
  const [result, setResult] = React.useState({
    clients: [],
    staffs: []
  });

  const handleSearch = async e => {
    const { value } = e.target;
    setKeyword(value ? value.toLowerCase() : '');
  };

  const searchData = async(keyword) => {
    try {
      const {data} = await ApiSearchs.find(keyword)
      setResult(data)
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    if(Validation.checkExist(newKeyword)){
      searchData(newKeyword)
    }
  }, [newKeyword])

  const resultActive = (result.clients.length > 0 || result.staffs.length > 0)

  return(
    <Wrapper>
      <LeftHeader>
        <InputGroup active={resultActive}>
          <span><i className="la la-search"></i></span>
          <Input onKeyUp={handleSearch} placeholder={"Search here"} className="input-search"/>
          {
            resultActive && (
              <Search>
                <>
                  {
                    result.staffs.map((a, i) => {
                      return(
                        <Link key={a.id} to={`/${role}/staffs/${a.id}`}>                 
                          <Card first={i === 0}>
                            <img src={a.avatar.url}/>
                            <div>
                              <b>{a.name}</b>
                              <span>{a.email}</span>
                              <p>staff</p>
                            </div>
                          </Card>
                        </Link>
                      )
                    })
                  }
                  {
                    result.clients.map(a => {
                      return(
                        <Link key={a.id} to={`/${role}/clients/${a.id}`}>                       
                          <Card>
                            <img src={a.avatar.url}/>
                            <div>
                              <b>{a.name}</b>
                              <span>{a.email}</span>
                              <p>client</p>
                            </div>
                          </Card>
                        </Link>
                      )
                    })
                  }
                </>
              </Search>
            )
          }
        </InputGroup>
      </LeftHeader>
      <RightHeader>
        <span>
          {/* {moment().format('dddd, D MMMM YYYY')} */}
        </span>
        <ul>
          <li><a><i className="la la-bell"></i></a></li>
          <li>
            <Link className={location.pathname.includes('settings') ? 'active' : ''} to={`/${role}/settings`}><i className="la la-cog"></i></Link>
          </li>
          <li><a><img src={avatar}/></a></li>
        </ul>
      </RightHeader>
    </Wrapper>
  )
}  

export default Header