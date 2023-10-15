import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { removeCookie } from '@/utils/cookies'

export default function AlertDialogExample({ isOpen, filter, onClose }: { isOpen: boolean, filter: string, onClose: (value: boolean) => void }) {
    const router = useRouter()

    const logoutHandler = () => {
        removeCookie()
        router.push('/')
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={() => onClose(false)}
        >
            <AlertDialogOverlay>
                <AlertDialogContent className='mt-4'>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {filter === 'logout' ? 'Logout' : filter === 'clientDelete' ? 'Delete Client' : 'Delete Project'}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {`Are you sure? You can't undo this action afterwards.`}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={() => onClose(false)}>
                            Cancel
                        </Button>
                        <Button className=' bg-red-700 text-stone-100 hover:bg-red-600' onClick={
                            filter === 'logout' ? logoutHandler : filter === 'clientDelete' ? '' : ''
                        } ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}