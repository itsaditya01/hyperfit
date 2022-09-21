export const visibility = (poses) => {

    // console.log(poses[0] != undefined && poses[0].keypoints)

    var score = 0

    poses[0] != undefined && poses[0].keypoints.map((value) => {

        value.score > 0.5 && score++

        return value

    })

    // console.log(score)

    return score/33

}

export const getAngle = (firstPoint, midPoint, lastPoint) => {

    if(firstPoint.score <= 0.5 && midPoint.score <= 0.5 && lastPoint.score <= 0.5)
    {
        return
    }

    var result = (Math.atan2(lastPoint.y - midPoint.y, lastPoint.x - midPoint.x) - Math.atan2(firstPoint.y - midPoint.y, firstPoint.x - midPoint.x))*180/Math.PI
        
    result = Math.abs(result)

    if (result > 180) {

        result = 360.0 - result

    }

    return result

}

export const getAngleZ = (firstPoint, midPoint, lastPoint) => {

    const a = [ firstPoint.x, firstPoint.y, firstPoint.z ]
    const b = [ midPoint.x, midPoint.y, midPoint.z ]
    const c = [ lastPoint.x, lastPoint.y, lastPoint.z ]

    const ab = a.map((v, i) => v - b[i])

    const cb = c.map((v, i) => v - b[i])

    const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

    const mag1 = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2])

    const mag2 = Math.sqrt(cb[0] * cb[0] + cb[1] * cb[1] + cb[2] * cb[2])

    const cos_angle = dot(ab, cb)/(mag1*mag2)

    var angle = Math.acos(cos_angle)

    angle = Math.abs(angle*180/Math.PI)

    if(angle > 180)
    {
        angle = 360 - angle
    }

    return angle

}

export const visibleCoords = (poses) => {

    var score = 0

    if(poses.poseLandmarks[0].visibility > 0.5)
    {
        score++
    }
    
    if(poses.poseLandmarks[11].visibility > 0.5 || poses.poseLandmarks[12].visibility > 0.5)
    {
        score++
    }
    
    if(poses.poseLandmarks[13].visibility > 0.5 || poses.poseLandmarks[14].visibility > 0.5)
    {
        score++
    }
    
    if(poses.poseLandmarks[15].visibility > 0.5 || poses.poseLandmarks[16].visibility > 0.5)
    {
        score++
    }
    
    if(poses.poseLandmarks[23].visibility > 0.5 || poses.poseLandmarks[24].visibility > 0.5)
    {
        score++
    }
    
    if(poses.poseLandmarks[25].visibility > 0.5 || poses.poseLandmarks[26].visibility > 0.5)
    {
        score++
    }
    
    if(poses.poseLandmarks[27].visibility > 0.5 || poses.poseLandmarks[28].visibility > 0.5)
    {
        score++
    }

    return (score)/7
}

// function crossProduct(a, b)
// {
//     cross_P[0] = a[1] * b[2] - a[2] * b[1];
//     cross_P[1] = a[2] * b[0] - a[0] * b[2];
//     cross_P[2] = a[0] * b[1] - a[1] * b[0];
// }

const normal = (firstPoint, midPoint, lastPoint) => {
    const a = [ firstPoint.x, firstPoint.y, firstPoint.z ]
    const b = [ midPoint.x, midPoint.y, midPoint.z ]
    const c = [ lastPoint.x, lastPoint.y, lastPoint.z ]

    const ab = a.map((v, i) => v - b[i])

    const cb = c.map((v, i) => v - b[i])

    const cross_product = (a, b) => (
        [ (a[1] * b[2]) - (a[2] * b[1]), (a[2] * b[0]) - (a[0] * b[2]), (a[0] * b[1]) - (a[1] * b[0]) ]
    )

    const mag1 = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2])

    const mag2 = Math.sqrt(cb[0] * cb[0] + cb[1] * cb[1] + cb[2] * cb[2])

    var prod = cross_product(cb, ab)

    const x = (Math.acos(prod[0]/(mag1*mag2)))*180/Math.PI
    const y = (Math.acos(prod[1]/(mag1*mag2)))*180/Math.PI
    const z = (Math.acos(prod[2]/(mag1*mag2)))*180/Math.PI

    return [ Math.round(x), Math.round(y), Math.round(z) ]
}

export const facing = (keypoints) => {
    const rsx = keypoints[12].x
    const lsx = keypoints[11].x

    const rsz = keypoints[12].z
    const lsz = keypoints[11].z

    const score_rs = keypoints[12].score
    const score_ls = keypoints[11].score

    // const norm = normal(keypoints[12], keypoints[11], keypoints[23])

    if(score_rs > 0.9 && score_ls > 0.9)
    {
        if(rsx < lsx)
        {
            if(lsx - rsx > 150)
            {
                return 'front'
            } else
            {
                if(Math.round((rsz - lsz)*1000) > 0)
                {
                    return 'right'
                } else
                {
                    return 'left'
                }
            }
        } else
        {
            return 'back'
        }
    } else
    {
        return 'Not visible'
    }
}

export function isin_leftview(frame,threshold){
    let count=0
    if (frame[15].visibility>threshold)
        {count+=1}
    if (frame[13].visibility>threshold)
        {count+=1}
    if(frame[11].visibility>threshold)
        {count+=1}
    if(frame[23].visibility>threshold)
        {count+=1}
    if (frame[25].visibility>threshold)
        {count+=1}
    return count*100/5
}

export function knee_ankle_distance(frame){
    const left_knee_y=frame[25].y
    const right_knee_y=frame[26].y
    const left_ankle_y=frame[27].y
    const right_ankle_y=frame[28].y
    const left=left_ankle_y-left_knee_y
    const right=right_ankle_y-right_knee_y
    if(Math.abs(left-right)/(left+right)<0.25){return true}
    else{return false}
}
export function is_horizontal(frame,th){
    const left_shoulder_x=frame[11].x
    const left_shoulder_y=frame[11].y
    const left_shoulder_z=frame[11].z
    const left_hip_x=frame[23].x
    const left_hip_y=frame[23].y
    const left_hip_z=frame[23].z
    const dx=left_shoulder_x-left_hip_x
    const dy=left_shoulder_y-left_hip_y
    const dz=left_shoulder_z-left_hip_z
    const distance=Math.sqrt(dx*dx+dy*dy+dz*dz)
    // if (isin_leftview(frame,0.8)>=100){
    if(Math.abs(left_shoulder_y-left_hip_y)<distance/th)
        {return true}
    else
        {return false}
    // }
}

export function knee_position(poses){
    const left_knee_y=poses[25].y
    const right_knee_y=poses[26].y
    const left_ankle_y=poses[27].y
    const leg_height=left_ankle_y-left_knee_y
    if(Math.abs(left_knee_y-right_knee_y)<0.3*leg_height)
        {return true}
    else{
        return false
    }
}

export function isin_rightview(poses,threshold){
    let count=0
    if (poses[16].visibility>threshold)
        {count+=1}
    if (poses[14].visibility>threshold)
        {count+=1}
    if(poses[12].visibility>threshold)
        {count+=1}
    if(poses[24].visibility>threshold)
        {count+=1}
    if (poses[26].visibility>threshold)
        {count+=1}
    return count*100/5
}

export const ankles_apart = (poses, th = 2) => {
    const left_knee_x = poses[25].x
    const left_knee_y = poses[25].y
    const left_ankle_x = poses[27].x
    const left_ankle_y = poses[27].y
    const right_ankle_x = poses[28].x
    const x = left_ankle_x-left_knee_x
    const y = left_ankle_y-left_knee_y
    const left_leg = Math.sqrt((x * x) + (y * y))
    return (Math.abs(right_ankle_x-left_ankle_x) > th * left_leg)
}
