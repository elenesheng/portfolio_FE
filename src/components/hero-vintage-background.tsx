'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Shape3D {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  type: 'cube' | 'sphere' | 'pyramid';
  rotationX: number;
  rotationY: number;
  velocityX: number;
  velocityY: number;
}

export default function HeroVintageBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const isMouseDown = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const shapes = useRef<Shape3D[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Clear any existing content
    svg.selectAll('*').remove();

    // Create 3D Shapes - positioned properly
    const colors = ['#FFEDD5', '#FED7AA', '#FB923C', '#FDBA74', '#C2410C'];

    shapes.current = [
      {
        id: 0,
        x: width * 0.2,
        y: height * 0.3,
        size: 80,
        color: colors[0],
        opacity: 0.7,
        type: 'cube',
        rotationX: 0,
        rotationY: 0,
        velocityX: 0,
        velocityY: 0,
      },
      {
        id: 1,
        x: width * 0.8,
        y: height * 0.25,
        size: 70,
        color: colors[1],
        opacity: 0.7,
        type: 'sphere',
        rotationX: 0,
        rotationY: 0,
        velocityX: 0,
        velocityY: 0,
      },
      {
        id: 2,
        x: width * 0.15,
        y: height * 0.7,
        size: 90,
        color: colors[2],
        opacity: 0.7,
        type: 'pyramid',
        rotationX: 0,
        rotationY: 0,
        velocityX: 0,
        velocityY: 0,
      },
      {
        id: 3,
        x: width * 0.85,
        y: height * 0.75,
        size: 60,
        color: colors[3],
        opacity: 0.7,
        type: 'sphere',
        rotationX: 0,
        rotationY: 0,
        velocityX: 0,
        velocityY: 0,
      },
      {
        id: 4,
        x: width * 0.6,
        y: height * 0.15,
        size: 75,
        color: colors[4],
        opacity: 0.7,
        type: 'cube',
        rotationX: 0,
        rotationY: 0,
        velocityX: 0,
        velocityY: 0,
      },
    ];

    // D3 Filters for 3D effect
    const defs = svg.append('defs');
    const glowFilter = defs
      .append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    glowFilter
      .append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'glow');

    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'glow');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // D3 LESSON: Create shape groups with proper positioning
    const shapeGroups = svg
      .selectAll('.shape-3d')
      .data(shapes.current)
      .enter()
      .append('g')
      .attr('class', 'shape-3d')
      .attr('id', (d) => `shape3d-${d.id}`)
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'grab');

    // D3 LESSON: 3D Shape Creation with proper SVG
    function create3DCube(group: any, shape: Shape3D) {
      const size = shape.size;
      const half = size / 2;

      // Create cube with multiple faces for 3D effect
      // Front face
      group
        .append('rect')
        .attr('class', 'cube-front')
        .attr('x', -half)
        .attr('y', -half)
        .attr('width', size)
        .attr('height', size)
        .attr('fill', shape.color)
        .attr('stroke', '#C2410C')
        .attr('stroke-width', 2)
        .attr('opacity', shape.opacity)
        .attr('filter', 'url(#glow)');

      // Top face for 3D depth
      group
        .append('path')
        .attr('class', 'cube-top')
        .attr(
          'd',
          `M ${-half} ${-half} L ${-half + 20} ${-half - 20} L ${half + 20} ${
            -half - 20
          } L ${half} ${-half} Z`
        )
        .attr(
          'fill',
          d3.color(shape.color)?.brighter(0.3)?.toString() || shape.color
        )
        .attr('stroke', '#C2410C')
        .attr('stroke-width', 1)
        .attr('opacity', shape.opacity * 0.8);

      // Right face for 3D depth
      group
        .append('path')
        .attr('class', 'cube-right')
        .attr(
          'd',
          `M ${half} ${-half} L ${half + 20} ${-half - 20} L ${half + 20} ${
            half - 20
          } L ${half} ${half} Z`
        )
        .attr(
          'fill',
          d3.color(shape.color)?.darker(0.3)?.toString() || shape.color
        )
        .attr('stroke', '#C2410C')
        .attr('stroke-width', 1)
        .attr('opacity', shape.opacity * 0.8);
    }

    function create3DSphere(group: any, shape: Shape3D) {
      const size = shape.size;
      const radius = size / 2;

      // Main sphere with gradient for 3D effect
      group
        .append('circle')
        .attr('class', 'sphere-main')
        .attr('r', radius)
        .attr('fill', shape.color)
        .attr('stroke', '#C2410C')
        .attr('stroke-width', 2)
        .attr('opacity', shape.opacity)
        .attr('filter', 'url(#glow)');

      // Highlight for 3D shading
      group
        .append('ellipse')
        .attr('class', 'sphere-highlight')
        .attr('cx', -radius * 0.3)
        .attr('cy', -radius * 0.3)
        .attr('rx', radius * 0.3)
        .attr('ry', radius * 0.2)
        .attr('fill', '#FFF')
        .attr('opacity', 0.5);

      // Shadow for depth
      group
        .append('ellipse')
        .attr('class', 'sphere-shadow')
        .attr('cx', radius * 0.2)
        .attr('cy', radius * 0.2)
        .attr('rx', radius * 0.4)
        .attr('ry', radius * 0.2)
        .attr('fill', '#000')
        .attr('opacity', 0.15);
    }

    function create3DPyramid(group: any, shape: Shape3D) {
      const size = shape.size;
      const height = size * 0.8;

      // Front face
      group
        .append('path')
        .attr('class', 'pyramid-front')
        .attr(
          'd',
          `M ${-size / 2} ${size / 3} L ${size / 2} ${
            size / 3
          } L 0 ${-height} Z`
        )
        .attr('fill', shape.color)
        .attr('stroke', '#C2410C')
        .attr('stroke-width', 2)
        .attr('opacity', shape.opacity)
        .attr('filter', 'url(#glow)');

      // Left face for 3D effect
      group
        .append('path')
        .attr('class', 'pyramid-left')
        .attr(
          'd',
          `M ${-size / 2} ${size / 3} L 0 ${-height} L ${-size / 4} ${
            size / 4
          } Z`
        )
        .attr(
          'fill',
          d3.color(shape.color)?.darker(0.2)?.toString() || shape.color
        )
        .attr('stroke', '#C2410C')
        .attr('stroke-width', 1)
        .attr('opacity', shape.opacity * 0.8);

      // Right face for 3D effect
      group
        .append('path')
        .attr('class', 'pyramid-right')
        .attr(
          'd',
          `M ${size / 2} ${size / 3} L 0 ${-height} L ${size / 4} ${size / 4} Z`
        )
        .attr(
          'fill',
          d3.color(shape.color)?.darker(0.4)?.toString() || shape.color
        )
        .attr('stroke', '#C2410C')
        .attr('stroke-width', 1)
        .attr('opacity', shape.opacity * 0.6);
    }

    // Create all shapes
    shapeGroups.each(function (d: Shape3D) {
      const group = d3.select(this);

      switch (d.type) {
        case 'cube':
          create3DCube(group, d);
          break;
        case 'sphere':
          create3DSphere(group, d);
          break;
        case 'pyramid':
          create3DPyramid(group, d);
          break;
      }
    });

    // D3 LESSON: Proper 3D rotation using SVG matrix transforms
    function apply3DRotation(shape: Shape3D) {
      const { x, y, rotationX, rotationY } = shape;

      // Calculate 3D transformation matrix
      const radX = (rotationX * Math.PI) / 180;
      const radY = (rotationY * Math.PI) / 180;

      // 3D rotation matrices
      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);

      // Combine rotations for 3D effect using skew and scale
      const scaleX = cosY;
      const skewX = sinY * 30; // Convert to skew for pseudo-3D
      const scaleY = cosX;
      const skewY = sinX * 20;

      // Apply D3 transform
      svg
        .select(`#shape3d-${shape.id}`)
        .transition()
        .duration(50)
        .ease(d3.easeLinear)
        .attr(
          'transform',
          `translate(${x}, ${y}) scale(${scaleX}, ${scaleY}) skewX(${skewX}) skewY(${skewY})`
        );
    }

    // D3 LESSON: Mouse interaction with proper distance calculation
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current) return;

      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const deltaX = mouseX - lastMousePos.current.x;
      const deltaY = mouseY - lastMousePos.current.y;

      // Find the shape closest to mouse
      let closestShape: Shape3D | null = null;
      let minDistance = Infinity;

      shapes.current.forEach((shape) => {
        const distance = Math.sqrt(
          Math.pow(mouseX - shape.x, 2) + Math.pow(mouseY - shape.y, 2)
        );
        if (distance < minDistance && distance < shape.size * 1.5) {
          minDistance = distance;
          closestShape = shape;
        }
      });

      // Apply rotation to the closest shape
      if (closestShape) {
        const sensitivity = 2;
        (closestShape as Shape3D).velocityY = deltaX * sensitivity; // Horizontal = Y rotation
        (closestShape as Shape3D).velocityX = deltaY * sensitivity; // Vertical = X rotation
      }

      lastMousePos.current = { x: mouseX, y: mouseY };
    };

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown.current = true;
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        lastMousePos.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }
      svg.style('cursor', 'grabbing');
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      svg.style('cursor', 'grab');
    };

    // D3 LESSON: Animation loop with requestAnimationFrame
    function animate() {
      shapes.current.forEach((shape: Shape3D) => {
        // Apply velocities to rotation
        shape.rotationX += shape.velocityX;
        shape.rotationY += shape.velocityY;

        // Friction
        shape.velocityX *= 0.95;
        shape.velocityY *= 0.95;

        // Apply the 3D rotation
        apply3DRotation(shape);
      });

      requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();

    // Touch support for mobile
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      handleMouseDown(mouseEvent);
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!event.touches[0]) return;

      const touch = event.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      handleMouseMove(mouseEvent);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      handleMouseUp();
    };

    // D3 event listeners
    const svgElement = svgRef.current;

    svgElement.addEventListener('mousedown', handleMouseDown);
    svgElement.addEventListener('mousemove', handleMouseMove);
    svgElement.addEventListener('mouseup', handleMouseUp);
    svgElement.addEventListener('mouseleave', handleMouseUp);

    svgElement.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    svgElement.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    svgElement.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Cleanup
    return () => {
      if (svgElement) {
        svgElement.removeEventListener('mousedown', handleMouseDown);
        svgElement.removeEventListener('mousemove', handleMouseMove);
        svgElement.removeEventListener('mouseup', handleMouseUp);
        svgElement.removeEventListener('mouseleave', handleMouseUp);
        svgElement.removeEventListener('touchstart', handleTouchStart);
        svgElement.removeEventListener('touchmove', handleTouchMove);
        svgElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 5,
        pointerEvents: 'all',
        cursor: 'grab',
      }}
    />
  );
}
