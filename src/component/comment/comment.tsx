import * as React from "react";
import {useEffect, useState} from "react";
import http from "../../service/http/http.service";
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {alpha, styled} from '@mui/material/styles';
import TreeItem, {treeItemClasses, TreeItemProps} from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import {animated, useSpring} from '@react-spring/web';
import {TransitionProps} from '@mui/material/transitions';
import {TreeView} from "@mui/lab";
import {NEWS, NewsItemResponse} from "../news-item/news-item";
import {AiOutlineComment} from "react-icons/ai";
import {Typography} from "@mui/material";

function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const Comment = (props: {id: number}) => {
  return (
    <div className="h-100">
      <CommentTree id={props.id}/>
    </div>
  )
}

export default Comment;

function CommentView(props:{id: number}) {
  const [comments, setComments] = useState<NEWS>();
  useEffect(() => {
    (async () => {
      const {data} =  await http.get<NewsItemResponse>(`item/${props.id}.json`);
      setComments(data);
    })();
  },[props.id])
  return (
    <div>{
      comments ?
        <div className="comment">
          <TreeView
            aria-label="customized"
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
            sx={{flexGrow: 1, maxWidth: 1440, overflowY: 'auto', overflowX:'hidden' }}
          >
            <StyledTreeItem nodeId={'tree_'+comments.id} label={
              <div>
                <span>{comments.text}</span>
                {<Typography align={"right"} variant="body2" color="text.secondary">
                  <AiOutlineComment className="item_icon t_comment"/>
                  <Typography className="px-1" align="right" fontWeight="bold" gutterBottom variant="h5" component="span">
                    <span className="t_comment">{comments.kids?.length ? comments.kids?.length : 0}</span>
                  </Typography>
                </Typography>}
              </div>
            }>
              {comments.kids && comments.kids.map(m => (
                <CommentView key={m} id={m} />
              ))}
            </StyledTreeItem>
            <hr/>
          </TreeView>
        </div>
        : null
    }</div>
  );
}

const CommentTree = (props: {id: number}) => {
  const [comments, setComments] = useState<NEWS>();

  useEffect((): void => {
    (async () => {
      const {data} =  await http.get<NewsItemResponse>(`item/${props.id}.json`)
      setComments(data);
    })();
  }, [props.id]);

  return (
    <div className="h-100">
      {comments?.kids ?
        <div className="d-flex h-100 flex-column">
          <div className="comment-tree flex-grow-1 comment-box">
            {comments.kids.map(c_id => (
              <CommentView key={c_id} id={c_id} />
            ))}
          </div>
        </div>
        : null}
    </div>

  );
}

