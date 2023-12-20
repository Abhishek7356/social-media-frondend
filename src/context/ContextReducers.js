
export const reducer = (state, action) => {
    switch (action.type) {
        case 'userLogin':
            return {
                user: action.payload
            }
    }
}