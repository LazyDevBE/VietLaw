import { useSelector } from 'react-redux'

function UserAvatar({ size = 'md', className = '' }) {
  const { user } = useSelector((state) => state.auth)

  const getUserDisplayName = () => {
    if (user?.name) return user.name
    if (user?.email) return user.email.split('@')[0]
    return 'User'
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-12 h-12 text-lg'
  }

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold ${className}`}>
      {user?.picture ? (
        <img 
          src={user.picture} 
          alt="Avatar" 
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        getUserInitials()
      )}
    </div>
  )
}

export default UserAvatar