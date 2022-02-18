import { Box, Modal } from '@mui/material';
import styles from '../../styles/Dashboard.module.css';

export default function Loading(props) {
  const { loading } = props;
  return (
    <Modal open={loading} sx={{ width: '100vw', height: '100vh' }}>
      <Box>
        <div className={styles.loading}></div>
      </Box>
    </Modal>
  );
}
