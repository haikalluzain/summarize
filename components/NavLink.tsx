import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

// type NavLinkProps = React.PropsWithChildren<LinkProps> & {
//   activeClassName?: string
//   className?: string
// }

// export const NavLink = ({
//   children,
//   activeClassName = 'active',
//   ...props
// }: NavLinkProps) => {
//   const { asPath } = useRouter()
//   const child = Children.only(children) as React.ReactElement
//   const childClassName = child.props.className || ''

//   const isActive = asPath === props.href || asPath === props.as

//   const className = cx(childClassName, { [activeClassName]: isActive })

//   return (
//     <Link {...props}>
//       {React.cloneElement(child, {
//         className: className || null,
//       })}
//     </Link>
//   )
// }

export { NavLink }

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
}

function NavLink({ href, children, ...props }) {
  const { pathname } = useRouter()
  const isActive = pathname === href

  if (isActive) {
    props.className += ' active'
  }

  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  )
}
