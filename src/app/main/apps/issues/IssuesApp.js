import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import IssueDialog from './IssueDialog';
import ContactsHeader from './IssuesHeader';
import ContactsList from './IssuesList';
import reducer from './store';
import { getIssues } from './store/issuesSlice';

function IssuesApp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    dispatch(getIssues(routeParams));
  }, [dispatch, routeParams]);

  return (
    <>
      <FusePageSimple
        classes={{
          contentWrapper: 'p-0 sm:p-24 h-full',
          content: 'flex flex-col h-full',
          leftSidebar: 'w-256 border-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          wrapper: 'min-h-0'
        }}
        header={<ContactsHeader pageLayout={pageLayout} />}
        content={<ContactsList />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <IssueDialog />
    </>
  );
}

export default withReducer('contactsApp', reducer)(IssuesApp);
