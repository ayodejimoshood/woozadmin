import { CREATE_CATEGORY,  
          GET_HASHTAGS, 
          GET_SPONSORS, 
          CREATE_SPONSOR, 
          DELETE_SPONSOR,
          CREATE_HASHTAG,
          DELETE_HASHTAG, 
          GET_CATEGORIES,
          DELETE_CATEGORY,
          EDIT_HASHTAG,
          EDIT_CATEGORY,
          EDIT_SPONSOR,
          CREATE_CHALLENGE,
          GET_CHALLENGES,
          EDIT_CHALLENGE,
          DELETE_CHALLENGE,
          EDIT_ENTRY,
          CREATE_ENTRY,
          GET_ENTRIES,
          DELETE_ENTRY
} from '../actions/types'

const INITIAL_STATE = {
  category: [],
  hashtag: [],
  hashTagEntry: [],
  sponsors: [],
  challenges: [],
  entries: []
}

export default function socials(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        category: [...state.category, action.payload]
      };
    case GET_CATEGORIES:
      return {
        ...state,
        category: [...action.payload]
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter(sp => {
          return sp._id !== action.payload
        })
      }
    case EDIT_CATEGORY:
      return {
        ...state,
        category: state.category.filter(cat => cat._id !== action.payload._id).concat([action.payload])
      }
    case GET_SPONSORS:
      return {
        ...state,
        sponsors: [...action.payload]
      }
    case CREATE_SPONSOR:
      return {
        ...state,
        sponsors: [...state.sponsors, action.payload]
      }
    case DELETE_SPONSOR:
      return {
        ...state,
        sponsors: state.sponsors.filter(sp => {
          return sp._id !== action.payload
        })
      }
    case EDIT_SPONSOR:
      console.log(action.payload._id)
      return {
        ...state,
        sponsors: state.sponsors.filter(spo => spo._id !== action.payload._id).concat([action.payload])
      }
    case GET_HASHTAGS:
      return {
        ...state,
        hashtag: [...action.payload]
      }
    case CREATE_HASHTAG:
      return {
        ...state,
        hashtag: [...state.hashtag, action.payload]
      }
    case DELETE_HASHTAG:
      return {
        ...state,
        hashtag: state.hashtag.filter(sp => {
          console.log(sp._id)
          return sp._id !== action.payload
        })
      }
    case EDIT_HASHTAG:
      return {
        ...state,
        hashtag: state.hashtag.filter(hash => hash._id !== action.payload._id).concat([action.payload])
      }
    case CREATE_CHALLENGE:
      return {
        ...state,
        challenges: [...state.challenges, action.payload]
      }
      case GET_CHALLENGES:
        return {
          ...state,
          challenges: [...action.payload]
        }
      case DELETE_CHALLENGE:
        return {
          ...state,
          challenges: state.challenges.filter(chal => {
            return chal._id !== action.payload
          })
        }
      case EDIT_ENTRY:
        return {
          ...state,
          entries: state.entries.filter(chal => chal._id !== action.payload._id).concat([action.payload])
        }
        case CREATE_ENTRY:
          return {
            ...state,
            entries: [...state.entries, action.payload]
          }
          case GET_ENTRIES:
            return {
              ...state,
              entries: [...action.payload]
            }
          case DELETE_ENTRY:
            return {
              ...state,
              entries: state.entries.filter(ent => {
                return ent._id !== action.payload
              })
            }
          case EDIT_ENTRY:
            return {
              ...state,
              entries: state.entries.filter(ent => ent._id !== action.payload._id).concat([action.payload])
            }
    default:
      return state;
  }
}





